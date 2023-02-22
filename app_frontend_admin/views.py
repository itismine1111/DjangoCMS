from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

# Create your views here.


# def error_not_found_404(request, exception):
#     return render(request, 'app_frontend_admin/404_not_found.html')

def error_not_found_404(request):
    return render(request, 'app_frontend_admin/404_not_found.html')

def index(request):
    # return render(request, 'app_frontend_admin/index.html')
    return redirect('linktype-list')

@login_required
def add_link_type(request):
    return render(request, 'app_frontend_admin/add_link_type_form.html')

@login_required
def add_link_info(request):
    return render(request, 'app_frontend_admin/add_link_info_form.html')

@login_required
def edit_link_type(request, pk):
    return render(request, 'app_frontend_admin/edit_link_type_form.html', {"pk":pk})

@login_required
def edit_link_info(request, pk):
    return render(request, 'app_frontend_admin/edit_link_info_form.html', {"pk":pk})

@login_required
def list_link_type(request):
    return render(request, 'app_frontend_admin/list_link_type.html')

@login_required
def list_link_info(request):
    return render(request, 'app_frontend_admin/list_link_info.html')