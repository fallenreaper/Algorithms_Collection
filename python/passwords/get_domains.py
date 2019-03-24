
import sys
import json
from pprint import pprint

def pretty(data):
	pprint(data)

def query(data, my_map):
	for row in data:
		for k in my_map:
			if my_map[k] in row[k]:
				print("{}".format(row[k]))

def dump(data, delimiter=","):
	'''
	data: json data
	delimiter: however you want to seperate the data. 
		You can use comma (,) or newline ($'\n')
	'''
	print("{}".format(delimiter).join([row["Domain"] for row in data if row["Domain"] != ""]))

def main():
	args = sys.argv
	if (len(args) < 2):
		print("Need File Argument.")
		exit(-1)
	file_to_open = args[1]
	delimiter = args[2] if len(args) > 2 else ","
	try:
		with open(file_to_open) as f:
			data = json.load(f)
		if delimiter == "pretty":
			pretty(data)
			exit(0)
		if delimiter == "query":
			query(data, json.loads(args[3]) if len(args) > 3 else {"Description": ""})
			exit(0)
		dump(data, delimiter)
	except IOError as e:
		print("Failed to Access file: {}".format(e))
		exit(-1)
	except Exception as e:
		print("Other Exception: {}".format(e))
		exit(-1)
	exit(0)

main()
