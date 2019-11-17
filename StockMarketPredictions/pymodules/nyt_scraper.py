import re
import requests
from unidecode import unidecode

# day = '30'
# month = '10'
# year = '2019'

# does something with weird unicode characters, I forget
regex = re.compile(r'&#(?!\s)((?:(?!;).)*)(?<!\s);')
def cleanse(string):
    string = str(string)
    if '&#' in string:
        matches = regex.findall(string)
        new_matches = []
        for i in range(len(matches)):
            if matches[i][0] != 'x':
                new_matches.append(chr(int(matches[i])))
            else:
                new_matches.append(chr(int(matches[i][1:], 16)))
            matches[i] = '&#' + matches[i] + ';'

        for i in range(len(matches)):
            string = string.replace(matches[i], new_matches[i])

        string = unidecode(string)

    stripped = ''.join([c for c in string if 0 < ord(c) < 127])
    return ' '.join(stripped.split()).replace(';', ',').lower()

key = 'dNqKVxCzozGR5AWJXiXrLPZWwAMPBggs'

def get_news_today(target_date):
	# output = open('todays_articles.csv', 'w')
	output = {'Date': [], 'Headline': [], 'Abstract': [], 'Lead Paragraph': [], 
                    'News Desk': [], 'Doc Type': [], 'Material Type': []}
	# output.write('Date;Headline;Lead Paragraph;News Desk;Doc Type;Material Type\n')

	# send api request
	year = target_date[0:4]
	month = target_date[5:7]
	response = requests.get('https://api.nytimes.com/svc/archive/v1/' + year + '/' + month + '.json?api-key=' + key)

	# iterate each article
	json = response.json()
	docs = json['response']['docs']
	for article in docs:

		# only get articles from today
		if article['pub_date'][:10] != target_date:
			continue

		#check for and cleanse inputs
		if 'main' in article['headline']:
			headline = cleanse(article['headline']['main'])
		else:
			headline = 'None'
		date = article['pub_date']
		if 'abstract' in article:
			abstract = cleanse(article['abstract'])
		else:
			abstract = 'None'
		if 'news_desk' in article:
			news_desk = cleanse(article['news_desk'])
		else:
			news_desk = 'None'
		doc_type = cleanse(article['document_type'])
		if 'type_of_material' in article:
			mat_type = cleanse(article['type_of_material'])
		else:
			mat_type = 'None'
		if 'lead_paragraph' in article:
			lead_paragraph = cleanse(article['lead_paragraph'])
		else:
			lead_paragraph = cleanse(article['snippet'])

		# output.write(date + ';' + headline + ';' + lead_paragraph + ';' + news_desk + ';' + doc_type + ';' + mat_type + '\n')
		# output += [{'date': date, 'headline': headline, 'lead_paragraph':  lead_paragraph,
        #             'news_desk': news_desk, 'doc_type': doc_type, 'mat_type': mat_type}]
		output['Date'] += [date]
		output['Headline'] += [headline]
		output['Abstract'] += [abstract]
		output['Lead Paragraph'] += [lead_paragraph]
		output['News Desk'] += [news_desk]
		output['Doc Type'] += [doc_type]
		output['Material Type'] += [mat_type]

	return output
