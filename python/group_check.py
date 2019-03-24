import logging, sys
# Setting level based on priority:  NOTSET, DEBUG, WARNING, INFO
logging.basicConfig(stream=sys.stderr, level=logging.INFO)
#logging.basicConfig(stream=sys.stderr, level=logging.NOTSET)

def group_check(string, tuples=[("{","}"), ("[","]"), ("(",")")]):
  arr = []
  for item in string:
    logging.debug(item)
    if item in [a for a,b in tuples]:
      arr += item
    logging.debug(arr)
    if len(arr) > 0:
      if arr[-1] in [a for a,b in tuples if b == item]:
        arr = arr[:-1]
    logging.debug(arr)
  return len(arr) == 0


print group_check("{{}}")
print group_check("(foo([]})")
print group_check("hello{} world(^5) * [5+2]")
print group_check("[[(([{foo}]))]]")