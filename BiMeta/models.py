from django.db import models
# import glob

# Create your models here.
# class listFile:
#     file_list = glob.glob("media/t/*.txt")

from os import listdir
from os.path import isfile, join
import os
def getFiles():
     list_file = [f for f in listdir("./media/t") if isfile(join("./media/t", f))]
     print("File co trong folder",list_file)
     return list_file


def removeFiles(filename):
     myfile="./media/t/" + filename
     if os.path.isfile(myfile):
          print("Co file")
          os.remove(myfile)
     else:
          print('Error, file not found')
     
def getOutputFiles():
     return [k for k in listdir("./Output") if isfile(join("./Output", k))]

def removeOutputFiles():
     dir ="./Output"
     for f in os.listdir(dir):
          os.remove(os.path.join(dir,f))

        

# def get_download_path():
#     """Returns the default downloads path for linux or windows"""
#     if os.name == 'nt':
#         import winreg
#         sub_key = r'SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders'
#         downloads_guid = '{374DE290-123F-4565-9164-39C4925E467B}'
#         with winreg.OpenKey(winreg.HKEY_CURRENT_USER, sub_key) as key:
#             location = winreg.QueryValueEx(key, downloads_guid)[0]
#         return location
#     else:
#         return os.path.join(os.path.expanduser('~'), 'downloads')
