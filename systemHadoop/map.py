#!/usr/bin/env python3 
  
import sys # import sys because we need to read and write data to STDIN and STDOUT
  
for line in sys.stdin: # reading entire line from STDIN (standard input) 
    line = line.strip() # to remove leading and trailing whitespace
    words = line.split() # split the line into words

    # we are looping over the words array and printing the word 
    # with the count of 1 to the STDOUT 
    for word in words: 
        # write the results to STDOUT (standard output); 
        # what we output here will be the input for the 
        # Reduce step, i.e. the input for reducer.py 
        print('%s\t%s' % (word, 1))
