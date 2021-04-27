from django.urls import path
from . import views
from django import http

# def session_test_1(request):
#     request.session['test'] = 'Session Vars Worked!'
#     return http.HttpResponseRedirect('done/?session=%s' % request.session.session_key)

# def session_test_2(request):
#     return http.HttpResponse('<br>'.join([
#         request.session.session_key,
#         request.GET.get('session'),
#         request.session.get('test', 'Session is Borked 🙁')
#          ]))
urlpatterns =[
    path('',views.index,name ='index'),
    path('system/',views.system,name='system'),
    path('aboutUs/',views.aboutUs,name='aboutUs'),
    path('download/<str:filename>',views.download_file),
    # path('register/',views.register,name='register'),
]
# patterns('',
#         (r'^session-test/$', session_test_1),
#         (r'^session-test/done/$', session_test_2),