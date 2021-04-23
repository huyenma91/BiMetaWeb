from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.views.generic import TemplateView, ListView, CreateView
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt
import requests
from .forms import RegistrationForm
from .models import *
from json import dumps
import subprocess
import sys
import mimetypes
from django.utils.encoding import smart_str
sys.path.append("/home/phuong")
import testtesttest

@csrf_exempt
def index(request):
    return render(request,'pages/home.html')
@csrf_exempt
def system(request):
    # print("File trong folder: ",onlyfiles)
    # data = 
    # print(data)
    if request.method == 'POST' and 'method' in request.POST:
        print(request.POST)
        if request.POST.get('method') == 'passParamters':
            # testtesttest.PhuongOcku('Phuong7 ocku qua')
            # kmer = request.POST.get('kmer')
            # print(request.POST.get('lofqmer'))
            # print(request.POST.get('sharereads'))
            # print(request.POST.get('maxcomp'))
            # print(request.POST.get('exGraph'))
            # print(request.POST.get('exFile'))
            # c = subprocess.call("python3 /home/phuong/testtesttest.py "+kmer,shell=True)
            return HttpResponse('yeah')
        elif request.POST.get('method') == 'showdata':
            resultObject = {}
            resultObject['listOfInputFile'] = getFiles()
            resultObject['listOfOutputFile'] = getOutputFiles()
            return HttpResponse( dumps(resultObject), content_type='application/json')
        # elif 'outputdata' in request.POST:
        #     print(getOutputFiles())
        #     return HttpResponse( dumps(getOutputFiles()), content_type='application/json')
        elif request.POST.get('method') == 'removeFilename':
            removeFiles(request.POST.get('removeFilename'))
            return HttpResponse( dumps(getFiles()) , content_type='application/json')    
        elif request.POST.get('method') == 'removeFileOutput':
            removeOutputFiles()
            return HttpResponse('asdasd')       
        elif request.POST.get('method') == 'chooseFile':
            fileChoose= request.POST.get('fileChoose')
            print(fileChoose)
            rc = subprocess.call("$HOME/ServerWeb/systemHadoop/runProgram2.sh"+" "+fileChoose,shell=True)
            return HttpResponse('haha')
    elif request.method == 'POST':
        upload_file = request.FILES['file']
        fileName=upload_file.name
        print(fileName)
        print(upload_file.size)
        fs = FileSystemStorage()
        fs_path = fs.save(upload_file.name,upload_file)
        print(fs_path)
        rc = subprocess.call("$HOME/ServerWeb/systemHadoop/runProgram2.sh"+" "+fileName,shell=True)
        print('done')
        return HttpResponse('asd')
    else:

            return render(request, 'pages/system.html',{"data":dumps(getFiles()),"outputdata":dumps(getOutputFiles())})
    return

def aboutUs(request):
    return render(request,'pages/aboutUs.html')

def download_file(request, filename=''):
    if filename != '':
        # Define Django project base directory
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        # Define the full file path
        print(BASE_DIR, filename)
        filepath = BASE_DIR + '/Output/' + filename
        # Open the file for reading content
        path = open(filepath, 'r')
        # Set the mime type
        mime_type, _ = mimetypes.guess_type(filepath)
        # Set the return value of the HttpResponse
        response = HttpResponse(path, content_type=mime_type)
        # Set the HTTP header for sending to browser
        response['Content-Disposition'] = "attachment; filename=%s" % filename
        return response

# def register(request):
#     form = RegistrationForm()
#     if request.method == 'POST':
#         form = RegistrationForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return HttpResponseRedirect('/')
#     return render(request, 'pages/register.html',{'form': form})
