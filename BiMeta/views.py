from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.views.generic import TemplateView, ListView, CreateView
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt
from django.http.response import StreamingHttpResponse
import requests
from .forms import RegistrationForm
from .models import *
from json import dumps
import json
import subprocess
import sys
import mimetypes
import time
from django.utils.encoding import smart_str
from .BimetaCode.read_file import load_meta_reads, readjson
import base64
from django.contrib import messages
from bs4 import BeautifulSoup
import os


@csrf_exempt
def index(request):
    print('check session trong index')
    if request.method == 'POST':
        try:
            print('home session :', request.session['user'])
            if request.session['user'] is not None:
                return HttpResponse('Logined')
        except:
            print('dead')
        return HttpResponse('NoLogin')
    return render(request, 'pages/home.html')


@csrf_exempt
def system(request):
    try:
        if request.session['user'] is not None:
            print('good session')
        elif request.method == 'POST':
            return HttpResponse('amazing gudjob')
        else:
            return HttpResponseRedirect('/login')
    except Exception as e:
        if request.method == 'POST':
            return HttpResponse('amazing gudjob')
        else:
            return HttpResponseRedirect('/login')

    # if request.method == 'POST':
    #     print(request.POST)
    if request.method == 'POST' and 'method' in request.POST:
        if request.POST.get('method') == 'passParamters':
            kmer = request.POST.get('kmer')
            lofqmer = request.POST.get('lofqmer')
            sharereads = request.POST.get('sharereads')
            maxcomp = request.POST.get('maxcomp')
            graphLayout = request.POST.get('graphLayout')
            print('graphLayout : ',graphLayout)
            step1 = request.POST.get('step1')
            step2 = request.POST.get('step2')
            step3 = request.POST.get('step3')
            step4 = request.POST.get('step4')
            step5 = request.POST.get('step5')
            step6 = request.POST.get('step6')
            steps = {
                "Step1": step1,
                "Step2": step2,
                "Step3": step3,
                "Step4": step4,
                "Step5": step5,
                "Step6": step6,
            }
            try:
                kNumber = request.POST.get('kNumber')
                if kNumber == "":
                    kNumber = "false"
            except Exception as e:
                print(e)
            paramData = {'params': {'kmer': kmer, 'lofqmer': lofqmer,
                                    'sharereads': sharereads, 'maxcomp': maxcomp, 'kNumber': kNumber}}
            request.session['time'] = getCurrentTime()[0]
            time = getCurrentTime()[1]
            try:
                print(f'1st: {request.session["time"]}')
                with open('/home/phuong/ServerWeb/BiMeta/userFolder/'+request.session['user']+'/history/'+request.session['time']+'.json', 'w+', encoding='utf-8') as json_file:
                    json.dump(paramData, json_file,
                              ensure_ascii=False, indent=4)
            except Exception as e:
                print(e)
            addStepJson(steps, '/home/phuong/ServerWeb/BiMeta/userFolder/' +
                        request.session['user']+'/history/'+request.session['time'])
            addTimeJson(time, '/home/phuong/ServerWeb/BiMeta/userFolder/' +
                        request.session['user']+'/history/'+request.session['time'])
            nodeGraph=request.session['time']+'.png'
            addNodeGraphJson(nodeGraph, '/home/phuong/ServerWeb/BiMeta/userFolder/' +
                        request.session['user']+ '/history/'+request.session['time'])
            return HttpResponse('yeah')
        elif request.POST.get('method') == 'showdata':
            resultObject = {}
            try:
                with open('/home/phuong/ServerWeb/BiMeta/userFolder/'+request.session['user']+'/history/'+request.session["time"]+'.json') as json_file:
                    dataBar = json.load(json_file)["graph"]
            except Exception as e:
                dataBar = []
            try:
                with open('/home/phuong/ServerWeb/BiMeta/userFolder/'+request.session['user']+'/history/'+request.session["time"]+'.json') as json_file:
                    overview = json.load(json_file)["overview"]
            except Exception as e:
                overview = []
            try:
                with open('/home/phuong/ServerWeb/BiMeta/userFolder/'+request.session['user']+'/history/'+request.session["time"]+'.json') as json_file:
                    time = json.load(json_file)["time"]
            except Exception as e:
                time = []
            #find nodeGrpah name
            try:
                with open('/home/phuong/ServerWeb/BiMeta/userFolder/'+request.session['user']+'/history/'+request.session["time"]+'.json') as json_file:
                    nodeGraphFile = json.load(json_file)["nodeGraph"]
            except Exception as e:
                nodeGraphFile = ""
            #send nodeGraph base64 to system.js
            try:
                with open('/home/phuong/ServerWeb/BiMeta/userFolder/'+request.session['user']+'/graph/'+nodeGraphFile, 'rb') as img_file:
                    nodeGraph = base64.b64encode(img_file.read()).decode('utf-8')
            except Exception as e:
                nodeGraph=[]
            resultObject['listOfInputFile'] = getFiles(request.session['user'])
            resultObject['listOfOutputFile'] = getOutputFiles(request.session['user'])
            resultObject['barGraphData'] = dataBar
            resultObject['overviewData'] = overview
            resultObject['time'] = time
            resultObject['graphImage'] = nodeGraph
            return HttpResponse(dumps(resultObject, indent=2), content_type='application/json')
        elif request.POST.get('method') == 'removeFilename':
            removeFiles(request.session['user'],
                        request.POST.get('removeFilename'))
            return HttpResponse(dumps(getFiles(request.session['user'])), content_type='application/json')
        elif request.POST.get('method') == 'removeFileOutput':
            removeOutputFiles(request.session['user'])
            return HttpResponse('asdasd')
        elif request.POST.get('method') == 'chooseFile':
            fileChoose = request.POST.get('fileChoose')

            data = load_meta_reads(
                'BiMeta/userFolder/'+request.session['user']+'/input/'+fileChoose)
            addFileJson(fileChoose, '/home/phuong/ServerWeb/BiMeta/userFolder/' +
                        request.session['user']+'/history/'+request.session['time'])
            addGraphJson(data, '/home/phuong/ServerWeb/BiMeta/userFolder/' +
                         request.session['user']+'/history/'+request.session['time'])

            print(f'2st: {request.session["time"]}')
            history_path='/home/phuong/ServerWeb/BiMeta/userFolder/' + request.session['user'] + '/history/'+request.session['time']+'.json'
            rc = subprocess.Popen("cd $HOME/ServerWeb/BiMeta/BimetaCode && bash run.sh" + " "+history_path + " "+request.session['user'] + " " + str(len(data)), shell=True, stderr=subprocess.PIPE, stdout=subprocess.PIPE)

            # rc = None
            # output = rc.stderr.read()
            # for line in rc.stderr:
            #     myString = line.decode("utf-8")
            #     print(myString + 'asdasdasd  s')
            stream = generateStreamingLog(
                rc, request.session['user'], request.session['time'], 'callback')
            response = StreamingHttpResponse(
                stream, status=200, content_type='text/plain')
            response['Cache-Control'] = 'no-cache'
            # rc.close()
            # rc.communicate()[0]
            # A = rc.returncode

            print('done')
            # if A is not None:
            #     print('rc tra ve')
            #     overview = readjson("/home/phuong/ServerWeb/BiMeta/jsonData")
            #     addOverviewJson(overview, '/home/phuong/ServerWeb/BiMeta/userFolder/'+ request.session['user'] +'/history/'+request.session['time'])
            return response

    elif request.method == 'POST' and 'file' in request.FILES:
        upload_file = request.FILES['file']
        fileName = upload_file.name
        # overviewFile = {"File": fileName}
        fs = FileSystemStorage('BiMeta/userFolder/' +
                               request.session['user']+'/input/',)
        fs_path = fs.save(upload_file.name, upload_file)

        data = load_meta_reads('BiMeta/userFolder/' +
                               request.session['user']+'/input/'+fileName)
        addFileJson(fileName, '/home/phuong/ServerWeb/BiMeta/userFolder/' +
                    request.session['user']+'/history/'+request.session['time'])
        addGraphJson(data, '/home/phuong/ServerWeb/BiMeta/userFolder/' +
                     request.session['user'] + '/history/'+request.session['time'])
        history_path='/home/phuong/ServerWeb/BiMeta/userFolder/' + request.session['user'] + '/history/'+request.session['time']+'.json'
        rc = subprocess.Popen("cd $HOME/ServerWeb/BiMeta/BimetaCode && bash run.sh" + " "+history_path + " "+request.session['user'] + " " + str(len(data)), shell=True, stderr=subprocess.PIPE, stdout=subprocess.PIPE)

        # rc = None

        # rc.communicate()[0]
        # A = rc.returncode
        # return HttpResponse(A)
        stream = generateStreamingLog(
            rc, request.session['user'], request.session['time'], 'callback')
        response = StreamingHttpResponse(
            stream, status=200, content_type='text/plain')
        response['Cache-Control'] = 'no-cache'
        print('done')
        # if A is not None:
        #     print('rc tra ve')
        #     overview = readjson("/home/phuong/ServerWeb/BiMeta/jsonData")
        #     addOverviewJson(overview, '/home/phuong/ServerWeb/BiMeta/userFolder/'+ request.session['user'] +'/history/'+request.session['time'])
        return response
    else:
        return render(request, 'pages/system.html')
    return


@csrf_exempt
def aboutUs(request):
    return render(request, 'pages/aboutUs.html')


@csrf_exempt
def register(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        userList = []
        with open('BiMeta/xmlFolder/userList.xml', 'r') as f:
            data_r = f.read()
            BS_data = BeautifulSoup(data_r, "xml")
            userList = [tag.string for tag in BS_data.find_all("username")]
        if username in userList:
            return HttpResponse('FAILED')
        elif (username) == '':
            return HttpResponse('UNKNOW')
        else:
            newUser = BeautifulSoup("<user></user>", "xml")
            userTag = newUser.user
            newUsername = newUser.new_tag("username")
            userTag.append(newUsername)
            newUsername.string = username
            newPassword = newUser.new_tag("password")
            userTag.append(newPassword)
            newPassword.string = password
            account = BS_data.account
            account.append(newUser)
            with open('BiMeta/xmlFolder/userList.xml', 'w') as f:
                f.write(str(BS_data))
            dirFolder = "BiMeta/userFolder/"+username
            if not os.path.exists(dirFolder):
                os.makedirs(dirFolder)
            dirHistory = "BiMeta/userFolder/"+username+"/history"
            if not os.path.exists(dirHistory):
                os.makedirs(dirHistory)
            dirOutput = "BiMeta/userFolder/"+username+"/output"
            if not os.path.exists(dirOutput):
                os.makedirs(dirOutput)
            dirGraph = "BiMeta/userFolder/"+username+"/graph"
            if not os.path.exists(dirGraph):
                os.makedirs(dirGraph)
            dirInput = "BiMeta/userFolder/"+username+"/input"
            if not os.path.exists(dirInput):
                os.makedirs(dirInput)
            return HttpResponse('SUCCESS')
    return render(request, 'pages/register.html')


@csrf_exempt
def login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        userList = []
        with open('BiMeta/xmlFolder/userList.xml', 'r') as f:
            data_r = f.read()
            BS_data = BeautifulSoup(data_r, "xml")
            userList = [tag.string for tag in BS_data.find_all("username")]

        if username in userList:
            correctPassword = BS_data.find_all(
                name="username", string=username)
            if (correctPassword[0].parent.password.string == password):
                request.session['user'] = username
                return HttpResponse('SUCCESS')
        elif (username) == '':
            return HttpResponse('UNKNOW')
        return HttpResponse('FAILED')
    return render(request, 'pages/login.html')


@csrf_exempt
def project(request):
    try:
        if request.session['user'] is not None:
            print('good session')
        elif request.method == 'POST':
            return HttpResponse('NoLogin')
        else:
            return HttpResponseRedirect('/login')
    except Exception as e:
        if request.method == 'POST':
            return HttpResponse('NoLogin')
        else:
            return HttpResponseRedirect('/login')
    if request.method == 'POST' and 'method' in request.POST:
        if request.POST.get('method') == 'showdata':
            resultObject = {}
            fileName = request.POST.get('json')
            try:
                with open('/home/phuong/ServerWeb/BiMeta/userFolder/'+request.session['user']+'/history/'+fileName) as json_file:
                    dataBar = json.load(json_file)["graph"]
            except Exception as e:
                dataBar = []
            try:
                with open('/home/phuong/ServerWeb/BiMeta/userFolder/'+request.session['user']+'/history/'+fileName) as json_file:
                    overview = json.load(json_file)["overview"]
                    print('day overview ;', overview)
                    fmeasure = overview["Fmeasure"]
                    recall = overview["Recall"]
                    precision = overview["Precision"]
                    # fmeasure = None
                    # recall = None
                    # precision = None
            except Exception as e:
                print('cannot get value')
                overview = []
                fmeasure = None
                recall = None
                precision = None
            try:
                with open('/home/phuong/ServerWeb/BiMeta/userFolder/'+request.session['user']+'/history/'+fileName) as json_file:
                    params = json.load(json_file)["params"]
            except Exception as e:
                params = []
            try:
                with open('/home/phuong/ServerWeb/BiMeta/userFolder/'+request.session['user']+'/history/'+fileName) as json_file:
                    fileJson = json.load(json_file)["file"]
            except Exception as e:
                fileJson = []
            try:
                with open('/home/phuong/ServerWeb/BiMeta/userFolder/'+request.session['user']+'/history/'+fileName) as json_file:
                    time = json.load(json_file)["time"]
            except Exception as e:
                time = []
             #find nodeGrpah name
            try:
                with open('/home/phuong/ServerWeb/BiMeta/userFolder/'+request.session['user']+'/history/'+fileName) as json_file:
                    nodeGraphFile = json.load(json_file)["nodeGraph"]
            except Exception as e:
                nodeGraphFile = ""
            #send nodeGraph base64 to system.js
            try:
                with open('/home/phuong/ServerWeb/BiMeta/userFolder/'+request.session['user']+'/graph/'+nodeGraphFile, 'rb') as img_file:
                    nodeGraph = base64.b64encode(img_file.read()).decode('utf-8')
            except Exception as e:
                nodeGraph=[]

            resultObject['barGraphData'] = dataBar
            resultObject['overviewData'] = overview
            resultObject['fmeasure'] = fmeasure
            resultObject['recall'] = recall
            resultObject['precision'] = precision
            resultObject['fileJson'] = fileJson
            resultObject['params'] = params
            resultObject['time'] = time
            resultObject['listOfJsonFile'] = getJsonFiles(request.session['user'])
            resultObject['graphImage'] = nodeGraph
            return HttpResponse(dumps(resultObject, indent=2), content_type='application/json')
        elif request.POST.get('method') == 'removeJsonFiles':
            removeJsonFiles(
                request.session['user'], request.POST.get('removeJsonFile'))
            return HttpResponse(dumps(getJsonFiles(request.session['user'])), content_type='application/json')
    else:
        return render(request, 'pages/project.html')
    return


@csrf_exempt
def logout(request):
    try:
        del request.session['user']
    except:
        pass
    return HttpResponseRedirect('/login')


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


def generateStreamingLog(rc, usersession, timesession, _callback=None):
    start_time = time.time()
    for line in rc.stderr:
        data = line.decode("utf-8")
        yield data
    time_process = (time.time() - start_time)
    yield "\n"
    yield "Processing time: " + str(time_process) + " seconds."
    if _callback:
        print('ghi de vao Jsonnnnnnnnn')
        overview = readjson("/home/phuong/ServerWeb/BiMeta/jsonData")
        addOverviewJson(overview, '/home/phuong/ServerWeb/BiMeta/userFolder/' +
                        usersession + '/history/'+timesession)
       
