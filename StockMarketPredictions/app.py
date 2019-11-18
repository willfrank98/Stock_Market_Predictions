from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

from pymodules.nyt_scraper import get_news_today
from pymodules.nyt_cleanser import cleanse_articles
from pymodules.fin_data_combiner import combine_fin_data
from pymodules.data_prep import do_final_prep
from pymodules.nn import do_nn

app = Flask(__name__, static_folder='static/dist', template_folder='templates')
app.config.from_pyfile('secrets/secrets.py')
db = SQLAlchemy(app)

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/about')
def about():
	return render_template('about.html')

@app.route('/get-graph-data/<int:offset>')
def get_graph_data(offset):
	data = Prediction.query.order_by(Prediction.date.desc()).limit(10 + offset).all()[offset:]
	# massage results into graphs' format
	date_list = []
	stock_data = []
	prediction_data = []
	for i in range(10):
		date_list += [[row.date for row in data[i::-1]]]

		stock_data += [[{'x': idx, 'y': row.closing} for idx, row in enumerate(data[i::-1])]]
		prediction_data += [[{'x': idx, 'y': data[i].closing} for idx in range(10)]]

	predictions = [row.prediction for row in data]

	return jsonify({'date_list': date_list, 'stock_data': stock_data, 'prediction_data': prediction_data, 'predictions': predictions})

@app.route('/get-next-day/<string:db_key>')
def get_next_day(db_key):
	if db_key != app.config['DB_KEY']:
		return jsonify("INVALID DB ACCESS KEY")

	date = datetime.today().strftime('%Y-%m-%d')
	articles = get_news_today(date, app.config['NYT_API'])
	cleanse_articles(articles)
	closing = combine_fin_data(date, app.config['DJI_API'])
	if closing is None:
		return jsonify("Could not get DJI entry for " + date)
	do_final_prep()
	prediction = do_nn()
	# add row to db
	db.session.add(Prediction(date=date, prediction=prediction, closing=closing))
	db.session.commit()
	return jsonify("Entry successfully added for " + date)

class Prediction(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	date = db.Column(db.String(10), nullable=False)
	prediction = db.Column(db.Float, nullable=False)
	closing = db.Column(db.Float, nullable=False)
	# row = db.Column(db.PickleType, nullable=False) //store data row as pickle!.. ?


@app.route('/seed-db')
def seed_db():
	db.create_all()
	Prediction.query.delete()
	data = open("2019-preload-data.csv", "rt")
	predictions = open("2019-predictions.txt", "rt")
	data.readline() # skip the first line
	for line, prediction in zip(data, predictions):
		line = line.split(',')
		db_row = Prediction(date=line[0], prediction=float(prediction), closing=float(line[-1]))
		db.session.add(db_row)
	db.session.commit()
	return jsonify("db seeded")

if __name__ == '__main__':
	app.run()