"""
WSGI config for PythonWeb project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'PythonWeb.settings')

application = get_wsgi_application()

# import socketio
# import eventlet

# static_files = {
#     '/static': './BiMeta/static',
# }

# sio = socketio.Server(async_mode='eventlet')
# app = socketio.WSGIApp(sio, application, static_files=static_files)


# # print('loz')

# @sio.event
# def connect(sid, environ):
#     print("connect ", sid)

# @sio.event
# def chat(sid, data):
#     print("message ", data)
#     sio.emit("abc", 'TIEN')

# @sio.event
# def disconnect(sid):
#     print('disconnect ', sid)

# # eventlet.wsgi.server(eventlet.listen(('', 5000)), app)
