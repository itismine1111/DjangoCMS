from django.shortcuts import render, redirect

# Create your views here.


# def error_not_found_404(request, exception):
#     return render(request, 'app_frontend_admin/404_not_found.html')

def error_not_found_404(request):
    return render(request, 'app_frontend_admin/404_not_found.html')

def index(request):
    # return render(request, 'app_frontend_admin/index.html')
    return redirect('linktype-list')


def add_link_type(request):
    return render(request, 'app_frontend_admin/add_link_type_form.html')


def add_link_info(request):
    return render(request, 'app_frontend_admin/add_link_info_form.html')


def edit_link_type(request, pk):
    return render(request, 'app_frontend_admin/edit_link_type_form.html', {"pk":pk})


def edit_link_info(request, pk):
    return render(request, 'app_frontend_admin/edit_link_info_form.html', {"pk":pk})


def list_link_type(request):
    return render(request, 'app_frontend_admin/list_link_type.html')


def list_link_info(request):
    return render(request, 'app_frontend_admin/list_link_info.html')