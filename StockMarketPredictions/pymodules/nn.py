import pandas as pd
import pickle
from tensorflow.keras.models import load_model

def do_nn():
	## Load Data ##
	data_x = pd.read_hdf('prepped_data.h5', key='data', index_col=False)

	## Load Neural Network ##

	model = load_model('data_models/trained_model.h5')

	## Evaluate Day ##

	prediction = model.predict(data_x.values)
	print(prediction)

	with open('data_models/scaler.pk', 'rb') as fin:
		scaler = pickle.load(fin)
	prediction = scaler.inverse_transform(prediction)

	print(prediction)
