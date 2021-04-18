#!/bin/bash

#$HADOOP_HOME/bin/hdfs dfs -put $HOME/Documents/folderCode/fileIn /user 

#$HADOOP_HOME/bin/hadoop jar $HADOOP_HOME/share/hadoop/tools/lib/hadoop-streaming-*.jar \
#-input /user/fileIn \
#-output /user/output \
#-mapper $HOME/Documents/folderCode/map.py \
#-reducer $HOME/Documents/folderCode/reduce.py \
#-file $HOME/Documents/folderCode/map.py \
#-file $HOME/Documents/folderCode/reduce.py

FNAME=$1

$HADOOP_HOME/bin/hdfs dfs -put $HOME/ServerWeb/systemHadoop/$FNAME /user

$HADOOP_HOME/bin/hadoop jar $HADOOP_HOME/share/hadoop/tools/lib/hadoop-streaming-*.jar \
-input /user/$FNAME \
-output /user/output \
-mapper $HOME/ServerWeb/systemHadoop/map.py \
-reducer $HOME/ServerWeb/systemHadoop/reduce.py \
-file $HOME/ServerWeb/systemHadoop/map.py \
-file $HOME/ServerWeb/systemHadoop/reduce.py
