from django.db import models
from os import listdir
from os.path import isfile, join
import os
import socket

def getFiles():
     list_file = [f for f in listdir("./media/t") if isfile(join("./media/t", f))]
     # print("File co trong folder",list_file)
     return list_file


def removeFiles(filename):
     myfile="./media/t/" + filename
     if os.path.isfile(myfile):
          os.remove(myfile)
     else:
          print('Error, file not found')
     
def getOutputFiles():
     return [k for k in listdir("./Output") if isfile(join("./Output", k))]

def removeOutputFiles():
     dir ="./Output"
     for f in os.listdir(dir):
          os.remove(os.path.join(dir,f))

# def getIP():
#      try: 
#           s = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
#           print("Socket successfully created")
#      except socket.error as err: 
#           print("socket creation failed with error %s" %(err))
#      port = 80
#      try: 
#           host_ip = socket.gethostbyname('www.google.com') 
#      except socket.gaierror: 
#           # this means could not resolve the host 
#           print ("there was an error resolving the host")
#           sys.exit()
#      s.connect((host_ip, port)) 
#      print ("the socket has successfully connected to google") 


# def client():
#      s = socket.socket()         

#      # Define the port on which you want to connect 
#      port = 12345                
     
#      # connect to the server on local computer 
#      s.connect(('127.0.0.1', port)) 
     
#      # receive data from the server 
#      print (s.recv(1024) )
#      # close the connection 
#      s.close()     