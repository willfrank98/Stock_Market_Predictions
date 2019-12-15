import os
import requests
import sys

os.environ['NO_PROXY'] = '127.0.0.1'

db_key = sys.argv[1]

r = requests.get('http://127.0.0.1/get-next-day/' + db_key)
print(r.json())
