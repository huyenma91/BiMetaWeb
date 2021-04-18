from django.urls import path
from . import views

urlpatterns ={
    path('',views.index),
    path('download/<str:filename>',views.download_file)
    # path('register/',views.register,name='register'),
}