from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'app_frontend_admin/index.html')


def add_link_type(request):
    return render(request, 'app_frontend_admin/add_link_type_form.html')


def add_link_info(request):
    return render(request, 'app_frontend_admin/add_link_info_form.html')


def list_link_type(request):
    return render(request, 'app_frontend_admin/list_link_type.html')


def list_link_info(request):
    return render(request, 'app_frontend_admin/list_link_info.html')