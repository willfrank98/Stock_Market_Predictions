import pickle
from re import sub
import numpy as np
import pandas as pd


def do_final_prep():
	## Load/Format Data ##
	data = pd.read_hdf('working_files/combined_data.h5', key='combined')

	# Open vectorizer from file and use it
	with open('data_models/tfidf.pk', 'rb') as fin:
		tfidf = pickle.load(fin)

	data_tf = tfidf.transform(data['Text'])

	words = ['word:' + word for word in tfidf.get_feature_names()]

	# extract date features
	def add_datepart(df, fldname, drop=True, time=False):
		"Helper function that adds columns relevant to a date."
		fld = df[fldname]
		fld_dtype = fld.dtype
		if isinstance(fld_dtype, pd.core.dtypes.dtypes.DatetimeTZDtype):
			fld_dtype = np.datetime64
		targ_pre = sub('[Dd]ate$', '', fldname)
		attr = ['Month', 'Week', 'Day', 'Dayofweek', 'Dayofyear', 'Is_month_end', 'Is_month_start', 'Is_quarter_end', 'Is_quarter_start', 'Is_year_end', 'Is_year_start']
		if time: attr = attr + ['Hour', 'Minute', 'Second']
		for n in attr: df[targ_pre + n] = getattr(fld.dt, n.lower())
		df[targ_pre + 'Elapsed'] = fld.astype(np.int64) // 10 ** 9
		if drop: df.drop(fldname, axis=1, inplace=True)

	data['Date'] = data['Date'].astype('datetime64[D]')
	add_datepart(data, 'Date')

	# recombine tfidf values with other data
	data_dense = data_tf.toarray()
	data_temp = data.drop(['Text'], axis=1)
	data_x = np.append(data_dense, data_temp.values, axis=1)
	feature_names = list(data_temp.columns)
	feature_names.extend(words)

	# scale features and labels to gaussian distribution
	with open('data_models/scaler.pk', 'rb') as fin:
		scaler = pickle.load(fin)
	data_x = scaler.transform(data_x)

	# save prepped data
	data_final = pd.DataFrame(data_x, columns=feature_names)
	data_final.to_hdf('working_files/prepped_data.h5', key='data')
