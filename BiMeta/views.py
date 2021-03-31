from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.views.generic import TemplateView, ListView, CreateView
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt
from .forms import UploadFileForm
import requests
import socket
def get_ip_address():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    return s.getsockname()[0]
# Create your views here.

@csrf_exempt
def index(request):
    if request.method == 'POST':
        print(request.POST)
        if 'kmer' in request.POST:
            print(request.POST.get('kmer'))
            print(request.POST.get('lofqmer'))
            print(request.POST.get('sharereads'))
            print(request.POST.get('maxcomp'))
            print(request.POST.get('numtasks'))
            print(request.POST.get('exGraph'))
            print(request.POST.get('exFile'))
        else:
            upload_file = request.FILES['file']
            print(upload_file.name)
            print(upload_file.size)
            fs = FileSystemStorage()
            fs_path = fs.save(upload_file.name,upload_file)
            print(fs_path)
    return render(request, 'pages/home.html')

print(get_ip_address())

# ## getting the hostname by socket.gethostname() method
# hostname = socket.gethostname()
# ## getting the IP address using socket.gethostbyname() method
# ip_address = socket.gethostbyname(hostname)
# ## printing the hostname and ip_address
# print(f"Hostname: {hostname}")
# print(f"IP Address: {ip_address}")
