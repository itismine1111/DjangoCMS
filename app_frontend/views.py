from django.shortcuts import render
from app_cms.models import LinkInfo

# Create your views here.

def index(request):
    return render(request, "app_frontend/index.html")

def show_links_page(request, id, slug):
    context = {}
    try:
        obj = LinkInfo.objects.get(id=id)
    except LinkInfo.DoesNotExist:
        obj = None
    
    if obj is not None:
        print(obj)
        context["page_data"] = obj.content
        return render(request, "app_frontend/show_links_page.html", context={"page_data": obj.content})
    
    return render(request, "app_frontend/index.html")