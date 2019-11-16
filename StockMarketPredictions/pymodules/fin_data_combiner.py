import pandas as pd
import requests

def combine_fin_data():
	news_input = pd.read_hdf('working_files/todays_articles_cleaner.h5', key='clean').drop('index', axis=1)

	# get relevant financial information for today
	url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts"
	querystring = {"region":"US","lang":"en","symbol":"^DJI","interval":"1d","range":"3mo"}
	headers = {
		'x-rapidapi-host': "apidojo-yahoo-finance-v1.p.rapidapi.com",
		'x-rapidapi-key': "815438e6dcmsh77769002d11c1a5p121a4ajsn426ca3d155df"
		}
	response = requests.request("GET", url, headers=headers, params=querystring)

	dji_raw = response.json()['chart']['result'][0]['indicators']['quote'][0]

	# gathers information about performance over the past x days
	dji_data = {'Date': '2019-11-11'}
	for i in range(1, 11):
			dji_data['prev' + str(i) + 'Days'] = (dji_raw['open'][-1] - dji_raw['open'][-1 - i]) / dji_raw['open'][-1]

	# create prevVolume, PrevHigh, and PrevLow, scaled to Open
	dji_data['prevVolume'] = dji_raw['volume'][-2] / dji_raw['open'][-1]
	dji_data['prevHigh'] = dji_raw['high'][-2] / dji_raw['open'][-1]
	dji_data['prevLow'] = dji_raw['low'][-2] / dji_raw['open'][-1]

	# gets other stock market information
	dji_data['Open'] = dji_raw['open'][-1]
	dji_data['High'] = dji_raw['high'][-1]
	dji_data['Low'] = dji_raw['low'][-1]
	dji_data['Close'] = dji_raw['close'][-1]
	dji_data['Volume'] = dji_raw['volume'][-1]
	dji_data['Adj Close'] = response.json()['chart']['result'][0]['indicators']['adjclose'][0]['adjclose'][-1]

	# format news_input's Date column
	# drops precision finer than one day
	news_input['Date'] = news_input['Date'].str[:10]

	# aggregate news articles into days
	def concat(series):
		return ". ".join(series.dropna())
	news_input = news_input.groupby('Date').agg({'Text': concat})

	# dji_df = pd.DataFrame(dji_data)
	for index in dji_data:
		dji_data[index] = [dji_data[index]]
	dji_df = pd.DataFrame.from_dict(dji_data)

	# join tables
	output = dji_df.join(news_input, on='Date')

	# save output
	output.to_hdf('working_files/combined_data.h5', key='combined')
