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


def getJsonFiles(session):
     list_file = [f for f in listdir('BiMeta/userFolder/'+session+'/history/') if isfile(join('BiMeta/userFolder/'+session+'/history/', f))]
     print("File co trong folder",list_file)
     return list_file


def removeJsonFiles(session,filename):
     myfile='BiMeta/userFolder/'+session+'/history/' + filename
     if os.path.isfile(myfile):
          os.remove(myfile)
     else:
          print('Error, file not found')


def getFiles(session):
     list_file = [f for f in listdir('BiMeta/userFolder/'+session+'/input/') if isfile(join('BiMeta/userFolder/'+session+'/input/', f))]
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
    current= datetime.datetime.now(pytz.timezone('Asia/Ho_Chi_Minh'))
    current_1st = current.strftime('%y_%m_%d_%H_%M_%S')
    current_2nd = current.strftime('%y-%m-%d %H:%M:%S')
    return current_1st,current_2nd

def addTimeJson(data, save_path):
     with open(save_path+'.json', 'r+', encoding='utf-8') as f:
          time={'time':data}
          newData = json.load(f)
          newData.update(time)
          f.seek(0)
          json.dump(newData, f, ensure_ascii=False, indent=4)

def addGraphJson(data, save_path):
     with open(save_path+'.json', 'r+', encoding='utf-8') as f:
          graphJson={'graph':data}
          newData = json.load(f)
          newData.update(graphJson)
          f.seek(0)
          json.dump(newData, f, ensure_ascii=False, indent=4)

def addOverviewJson(data, save_path):
     with open(save_path+'.json', 'r+', encoding='utf-8') as f:
          overviewJson={'overview':data}
          newData = json.load(f)
          newData.update(overviewJson)
          f.seek(0)
          json.dump(newData, f, ensure_ascii=False, indent=4)

def addFileJson(data, save_path):
     with open(save_path+'.json', 'r+', encoding='utf-8') as f:
          fileJson={'file':data}
          newData = json.load(f)
          newData.update(fileJson)
          print(newData)
          f.seek(0)
          json.dump(newData, f,ensure_ascii=False, indent=4)      

def addStepJson(data, save_path):
     with open(save_path+'.json', 'r+', encoding='utf-8') as f:
          stepJson={'steps':data}
          newData = json.load(f)
          newData.update(stepJson)
          print(newData)
          f.seek(0)
          json.dump(newData, f,ensure_ascii=False, indent=4)      

def addNodeGraphJson(data, save_path):
     with open(save_path+'.json', 'r+', encoding='utf-8') as f:
          nodeGraphJson={'nodeGraph':data}
          newData = json.load(f)
          newData.update(nodeGraphJson)
          print(newData)
          f.seek(0)
          json.dump(newData, f,ensure_ascii=False, indent=4)   

