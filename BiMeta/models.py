from django.db import models
from os import listdir
from os.path import isfile, join
import os
import socket
# from datetime import datetime
# from time import localtime, strftime
import datetime 
import pytz
import json
import uuid

def getFiles(session):
     list_file = [f for f in listdir('BiMeta/userFolder/'+session+'/input/') if isfile(join('BiMeta/userFolder/'+session+'/input/', f))]
     # print("File co trong folder",list_file)
     return list_file


def removeFiles(session,filename):
     myfile='BiMeta/userFolder/'+session+'/input/' + filename
     if os.path.isfile(myfile):
          os.remove(myfile)
     else:
          print('Error, file not found')
     
def getOutputFiles(session):
     return [k for k in listdir('BiMeta/userFolder/'+session+'/output') if isfile(join('BiMeta/userFolder/'+session+'/output', k))]

def removeOutputFiles(session):
     dir ='BiMeta/userFolder/'+session+'/output'
     for f in os.listdir(dir):
          os.remove(os.path.join(dir,f))

def UUIDgenerator():
     myuuid = uuid.uuid4()
     UUID=str(myuuid)
     print('Your UUID is: ' + UUID)
     return UUID
   

def getCurrentTime():
    current_time = datetime.datetime.now(pytz.timezone('Asia/Ho_Chi_Minh'))
    current_time = current_time.strftime('%y%m%d%H%M%S')
    return current_time

# def convert2json(data,session, save_path):
#      with open(save_path+session+'.json', 'r+', encoding='utf-8') as f:
#           graphJson={'graph':data}
#           newData = json.load(f)
#           newData.update(graphJson)
#           f.seek(0)
#           json.dump(newData, f, ensure_ascii=False, indent=4)

# def createHistoryJson():
#      data = {}
#      data['people'] = []
#      data['people'].append({
#      'name': 'Scott',
#      'website': 'stackabuse.com',
#      'from': 'Nebraska'
#      })
#      print(data)
#      with open('BiMeta/jsonHistory/'+getCurrentTime()+'.json', 'w') as outfile:
#           json.dump(data, outfile)
#           print("create success")
