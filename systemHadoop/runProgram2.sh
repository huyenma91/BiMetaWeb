#!/bin/bash

FNAME=$1

$HADOOP_HOME/bin/hdfs dfs -put $HOME/ServerWeb/systemHadoop/$FNAME /user

python3 $HOME/ServerWeb/systemHadoop/cWord.py hdfs://localhost:9000/user/$FNAME > $HOME/ServerWeb/Output/outputFile -r hadoop
