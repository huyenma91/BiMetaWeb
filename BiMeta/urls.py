from django.urls import path
from . import views

urlpatterns =[
    path('',views.index,name ='index'),
    path('system/',views.system,name='system'),
    path('aboutUs/',views.aboutUs,name='aboutUs'),
    path('download/<str:filename>',views.download_file),
    # path('register/',views.register,name='register'),
]