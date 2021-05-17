conda activate pyenv

DATA_PATH=bimeta/data/test
INPUT_FILE=R4_medium.fna
LENGTHS_OF_K_MERS=4
LENGTH_OF_Q_MERS=30
NUM_SHARED_READS=45
NUM_OF_SPECIES=2
USR_HDFS=hdfs:///user/graphframes_cps/2


# Step 3
spark-submit bimeta/cluster_groups/kmeans.py \
--group $DATA_PATH/output_2_2/part-00000 \
--corpus $DATA_PATH/output_1_3.txt \
--dictionary $DATA_PATH/dictionary.pkl \
--species $NUM_OF_SPECIES \
--labels $DATA_PATH/output_1_1/part-00000 \
--time $DATA_PATH