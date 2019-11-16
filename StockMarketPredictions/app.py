from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder='static/dist', template_folder='templates')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/get-graph-data/<int:offset>')
def get_graph_data(offset):
	data = Prediction.query.order_by(Prediction.date).limit(20 + offset).all()[offset:]
	# massage results into graphs' format
	result = {
		'stock_data': [{ 'date': row.date, 'value': row.closing } for row in data],
		# 'prediction_data': [{ 'date': row.date, 'value': row.closing } for row in data],
		'predictions': [1 if row.prediction > 0 else -1 for row in data]
	}
	return jsonify(result)

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
	return "db seeded"

if __name__ == '__main__':
	app.run(debug=True)