from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder='static/dist', template_folder='templates')
db = SQLAlchemy(app)

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/get-graph-data')
def get_graph_data():
	pass

class Prediction(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	date = db.Column(db.Date, nullable=False)
	prediction = db.Column(db.Float, nullable=False)

if __name__ == '__main__':
	app.run(debug=True)