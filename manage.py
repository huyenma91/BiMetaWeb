#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import socket

# def server():
#      s = socket.socket()         
#      print ("Socket successfully created")
#      port = 12345   
#      s.bind(('', port))         
#      print ("socket binded to %s" %(port)) 
#      s.listen(5)     
#      print ("socket is listening")         
#      while True:
#           c, addr = s.accept()     
#           print ('Got connection from', addr )
#           c.send('Thank you for connecting') 
#           c.close()

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'PythonWeb.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
