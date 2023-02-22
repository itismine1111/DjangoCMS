from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, "app_frontend/index.html")

def show_links_page(request):
    return render(request, "app_frontend/show_links_page.html")