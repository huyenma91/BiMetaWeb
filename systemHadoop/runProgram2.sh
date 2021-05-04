#!/bin/bash
FNAME=$1
OUTFOLDER=hdfs:///user/out_cWord

$HADOOP_HOME/bin/hdfs dfs -put $HOME/ServerWeb/media/t/$FNAME /user

python3 $HOME/ServerWeb/systemHadoop/cWord.py hdfs://tnhancomputer:9000/user/$FNAME --output $OUTFOLDER -r hadoop

hdfs dfs -get /user/out_cWord/part-00000 $HOME/ServerWeb/Output

mv $HOME/ServerWeb/BiMeta/Output/part-00000 $HOME/ServerWeb/BiMeta/Output/outCWord

# for i in {0..10..1}
# do
# 	echo "dead lan thu $i"
#     sleep 1
# done