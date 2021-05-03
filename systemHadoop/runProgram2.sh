#!/bin/bash
FNAME=$1

$HADOOP_HOME/bin/hdfs dfs -put $HOME/ServerWeb/media/t/$FNAME /user

python3 $HOME/ServerWeb/systemHadoop/cWord.py hdfs://localhost:9000/user/$FNAME > $HOME/ServerWeb/Output/outputFile -r hadoop

# for i in {0..10..1}
# do
# 	echo "dead lan thu $i"
#     sleep 1
# done