import pandas as pd

def cleanse_articles(articles):
	# loads data into dataframe and sorts by date
	# the NYT api sometimes returns articles imperfectly ordered by date
	# articles = pd.read_csv('todays_articles.csv', sep=';', error_bad_lines=False)
	articles = pd.DataFrame.from_dict(articles)

	# these headline'd articles contain no useful information
	bad_headlines = ['year-end stock tables', 'key rates', 'dividend meetings', 'economic calendar', 'corrections']
	articles = articles[~articles['Headline'].isin(bad_headlines)]

	# makes sure no null values of desired fields are let through
	articles = articles[articles['Lead Paragraph'].notnull()]
	articles = articles[articles['News Desk'].notnull()]
	articles = articles[articles['Lead Paragraph'] != 'none']

	# makes sure article is from certain 'news desks'
	articles['News Desk'] = articles['News Desk'].astype(str)
	temp_df = pd.DataFrame()
	for desk in ['business', 'commerce', 'career', 'invest', 'real estate', 'financ', 'job', 'foreign', 'national']:
		temp = articles[articles['News Desk'].str.contains(desk)]
		temp_df = temp_df.append(temp, ignore_index=True)
	articles = temp_df
	del temp_df

	# drop undesired columns  and sort by date before appending
	articles = articles.drop(['Headline', 'Abstract', 'News Desk', 'Doc Type', 'Material Type'], axis=1)
	articles = articles.sort_values('Date').reset_index()

	# rename desired field to Text
	articles = articles.rename(index=str, columns={'Lead Paragraph': 'Text'})

	# save to file
	output = pd.DataFrame()
	output = output.append(articles, ignore_index=True)
	output.to_hdf('pymodules/working_files/todays_articles_cleaner.h5', key='clean')
