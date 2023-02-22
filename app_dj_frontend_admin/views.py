from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.decorators.csrf import requires_csrf_token
from django.db import transaction
from django.forms.models import model_to_dict
from app_cms.models import LinkType, LinkInfo

from .forms import LinkTypeForm

# Create your views here.

def index(request):
    return redirect(list_link_type)
    # return render(request, "app_dj_frontend_admin/index.html")


@requires_csrf_token
def list_link_type(request):
    if request.method == "GET":
        objs = LinkType.objects.all()
        context = {
            "objs" : objs,
            "count": len(objs)
        }
        return render(request, "app_dj_frontend_admin/list_link_type.html", context=context)



def edit_link_type(request, id):
    if request.method == "GET":
        try:
            obj = LinkType.objects.get(id=id)
        except LinkType.DoesNotExist:
            obj = None
            #TODO:  redirect to 404

        context = {
            "obj" : obj,
        }
        return render(request, "app_dj_frontend_admin/edit_link_type.html", context=context)
    
    elif request.method == "POST":
        pass


def del_link_type(request, id):
    if request.method == "DELETE":
        try:
            obj = LinkType.objects.get(id=id)
            obj.delete()
        except LinkType.DoesNotExist:
            obj = None
            # TODO: redirect to 404
        return JsonResponse({'success':True,'message':f"Link Type with id {id} deleted successfully"}, status=204)
    



@requires_csrf_token
def list_link_info(request):
    if request.method == "GET":

        link_info_objs = LinkInfo.objects.all().filter(parentId__isnull=True)
        link_type_objs = LinkType.objects.all()

        context = {
            "link_info_objs" : link_info_objs,
            "count_link_info_objs": len(link_info_objs),
            "link_type_objs" : link_type_objs,
            "count_link_type_objs": len(link_type_objs)
        }
        return render(request, "app_dj_frontend_admin/list_link_info.html", context=context)



def edit_link_info(request, id):
    if request.method == "GET":
        try:
            obj = LinkInfo.objects.get(id=id)
        except LinkInfo.DoesNotExist:
            obj = None
            # TODO: redirect to 404

        context = {
            "obj" : obj,
        }
        return render(request, "app_dj_frontend_admin/edit_link_info.html", context=context)
    
    elif request.method == "POST":
        pass


def del_link_info(request, id):
    if request.method == "DELETE":
        try:
            obj = LinkInfo.objects.get(id=id)
            obj.delete()
        except LinkInfo.DoesNotExist:
            obj = None
            # TODO: redirect to 404
        return JsonResponse({'success':True,'message':f"Link Info with id {id} deleted successfully"}, status=204)
    



def set_sorting_order(request):
    if request.method == "POST":
        returnobj = {}
        objs = []
        error_occured = False
        print(request.POST.get("linkInfoIdList"))
        objIdList = request.POST.get("linkInfoIdList")

        for id in objIdList:
            try:
                objs.append(LinkInfo.objects.get(id=id))
            except LinkInfo.DoesNotExist:
                error_occured = True

        if(error_occured):
            # TODO: Redirect to 404 page
            return JsonResponse({'success':False,'message':f"Can't find Link Info with the given id"}, status=404)

        try:
            with transaction.atomic():
                for index, obj in enumerate(objs):
                    # obj.update(sortOrderId=index)
                    obj.sortOrderId = index
                    obj.save(update_fields=['sortOrderId'])
                    # print(f"{index} :: {obj.sortOrderId} :: {obj}")
                    
        except:
            error_occured = True

        if(error_occured):
            return JsonResponse({'success':False,'message':f"Can't update Link info sort order"}, status=500)

        return JsonResponse({'success':True,'message':f"Sort order of Link Info's updated successfully"}, status=200)
    


def post_link_type_form(request):
    if request.method == "POST":
        form = LinkTypeForm(request.POST)
        if(form.is_valid()):
            # Process the data
            link_type_obj = LinkType()
            link_type_obj.linkType = form.cleaned_data['linkType']
            link_type_obj.save()
            return redirect(reverse('dj-list-link-type'))
    else:  
        form = LinkTypeForm()
    
    return render(request, "app_dj_frontend_admin/add.html", {"form": form})


def post_edit_link_type_form(request, id):
    obj = LinkType.objects.get(id=id)
    if request.method == "POST":
        form = LinkTypeForm(request.POST)
        if(form.is_valid()):
            obj.linkType = form.cleaned_data['linkType']
            obj.save()
            return redirect(reverse('dj-list-link-type'))
        else:
            return render(request, "app_dj_frontend_admin/edit.html", {"form": form})
    else:  
        form = LinkTypeForm(initial=model_to_dict(obj))
    
    return render(request, "app_dj_frontend_admin/edit.html", {"form": form})
