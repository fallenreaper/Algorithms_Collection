
import sys
import json

def main():
	args = sys.argv
	map = json.loads(args[1])
	print("{}".format(map))
main()
