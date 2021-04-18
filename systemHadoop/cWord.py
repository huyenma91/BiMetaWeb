#!/user/bin/env python3

from mrjob.job import MRJob

class Count(MRJob):

     def mapper(self, _, line):
         for word in line.split():
             yield(word, 1)

     def reducer(self, word, counts):
         yield(word, sum(counts))
  
"""the below 2 lines are ensuring the execution of mrjob, the program will not
execute without them"""        
if __name__ == '__main__':
    Count.run()
