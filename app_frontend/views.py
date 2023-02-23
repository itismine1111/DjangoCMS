from django.shortcuts import redirect, render
from django.urls import reverse
from app_cms.models import LinkInfo

# Create your views here.

def error404(request):
        data = {}
        return render(request,'app_frontend/404.html', data)

def index(request):
    return render(request, "app_frontend/index.html")


def show_links_page(request, url):
    print("url")
    print(url)  
    if url == "" or url == "null" or url == "#":
        return redirect('error404')
    
    objList = LinkInfo.objects.filter(url__exact=url)
    print(len(objList))


    if len(objList) != 0:
        print("REACHING HERE")
        obj = objList[0]
        return render(request, "app_frontend/show_links_page.html", context={"page_data": obj.content, "title": obj.title})
    
    return redirect('error404')
    # return render(request, "app_frontend/404.html")