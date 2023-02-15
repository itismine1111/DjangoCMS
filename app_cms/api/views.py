from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.decorators import api_view
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from django.db import transaction
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.core.cache import cache
from app_cms.models import LinkInfo, LinkType
from .serializers import LinkInfoSerializer, LinkTypeSerializer, GetLinkInfoSerializerTreeView
from .filters import LinkInfoFilter
from collections import defaultdict
import json
from pprint import pprint



class LinkTypeApi(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        # id = request.data.get("id")

        id = request.GET.get("id")

        try:
            obj = LinkType.objects.get(id=id)
        except:
            LinkType.DoesNotExist
            obj = None

        if obj is not None:
            serializer = LinkTypeSerializer(obj)

            return Response(
                {
                    "success": True,
                    "message": "Link Type GET request successful.",
                    "data": serializer.data,
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {
                "success": False,
                "message": f"Link Type GET request unsuccessful. Link Type with id {id} does not exist",
                "data": {},
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    def post(self, request, *args, **kwargs):
        serializer = LinkTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "success": True,
                    "message": "New LinkType created successfully",
                    "data": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            {
                "success": False,
                "message": "Errors occured while creating new LinkType",
                "data": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    def update(self, request, *args, **kwargs):
        id = request.data.get("id")

        try:
            obj = LinkType.objects.get(id=id)
        except LinkType.DoesNotExist:
            obj = None

        if obj is not None:
            serializer = LinkTypeSerializer(obj, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {
                        "success": True,
                        "message": "Link Type UPDATE request unsuccessful. Error while updating fields.",
                        "data": {},
                    },
                    status=status.HTTP_200_OK,
                )

            else:
                return Response(
                    {"success": False, "message": "", "data": serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        return Response(
            {
                "success": False,
                "message": "Link Type UPDATE request unsuccessful. Link Type with id {id} does not exist",
                "data": {},
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    def delete(self, request, *args, **kwargs):
        id = request.data.get("id")
        try:
            obj = LinkType.objects.get(id=id)
        except:
            LinkType.DoesNotExist
            obj = None

        if obj is not None:
            obj.delete()

            return Response(
                {
                    "success": True,
                    "message": "Link Type DELETE request successful",
                    "data": {},
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {
                "success": False,
                "message": f"Link Type DELETE request unsuccessful. Link Type with id {id} does not exist",
                "data": {},
            },
            status=status.HTTP_404_NOT_FOUND,
        )


@api_view(["PATCH"])
def updateLinkType(request, id):
    try:
        obj = LinkType.objects.get(id=id)
    except LinkType.DoesNotExist:
        obj = None

    if obj is not None:
        serializer = LinkTypeSerializer(obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "success": True,
                    "message": "Link Type UPDATE request unsuccessful. Error while updating fields.",
                    "data": {},
                },
                status=status.HTTP_200_OK,
            )

        else:
            return Response(
                {"success": False, "message": "", "data": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

    return Response(
        {
            "success": False,
            "message": "Link Type UPDATE request unsuccessful. Link Type with id {id} does not exist",
            "data": {},
        },
        status=status.HTTP_404_NOT_FOUND,
    )


class LinkInfoApi(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        # id = request.data.get("id")

        id = request.GET.get("id")

        try:
            obj = LinkInfo.objects.get(id=id)
        except:
            LinkInfo.DoesNotExist
            obj = None

        if obj is not None:
            serializer = LinkInfoSerializer(obj)

            return Response(
                {
                    "success": True,
                    "message": "Link Info GET request successful",
                    "data": serializer.data,
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {
                "success": False,
                "message": f"Link Info GET request unsuccessful. Link Info with id {id} does not exist",
                "data": {},
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    def post(self, request, *args, **kwargs):
        serializer = LinkInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "success": True,
                    "message": "New LinkInfo created successfully",
                    "data": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            {
                "success": False,
                "message": "Errors occured while creating new LinkInfo",
                "data": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    def update(self, request, *args, **kwargs):
        id = request.data.get("id")

        try:
            obj = LinkInfo.objects.get(id=id)
        except LinkInfo.DoesNotExist:
            obj = None

        if obj is not None:
            serializer = LinkInfoSerializer(obj, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {
                        "success": True,
                        "message": "Link Info UPDATE request unsuccessful. Error while updating fields.",
                        "data": {},
                    },
                    status=status.HTTP_200_OK,
                )

            else:
                return Response(
                    {"success": False, "message": "", "data": serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        return Response(
            {
                "success": False,
                "message": "Link Info UPDATE request unsuccessful. Link Info with id {id} does not exist",
                "data": {},
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    def delete(self, request, *args, **kwargs):
        id = request.data.get("id")
        try:
            obj = LinkInfo.objects.get(id=id)
        except:
            LinkInfo.DoesNotExist
            obj = None

        if obj is not None:
            obj.delete()

            return Response(
                {
                    "success": True,
                    "message": "Link Info DELETE request successful",
                    "data": {},
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {
                "success": False,
                "message": f"Link Info DELETE request unsuccessful. Link Info with id {id} does not exist",
                "data": {},
            },
            status=status.HTTP_404_NOT_FOUND,
        )


@api_view(["PATCH"])
def updateLinkInfo(request, id):
    try:
        obj = LinkInfo.objects.get(id=id)
    except LinkInfo.DoesNotExist:
        obj = None

    if obj is not None:
        serializer = LinkInfoSerializer(obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "success": True,
                    "message": "Link Info UPDATE request successful.",
                    "data": {},
                },
                status=status.HTTP_200_OK,
            )

        else:
            return Response(
                {"success": False, "message": "", "data": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

    return Response(
        {
            "success": False,
            "message": "Link Info UPDATE request unsuccessful. Link Info with id {id} does not exist",
            "data": {},
        },
        status=status.HTTP_404_NOT_FOUND,
    )


class ListLinkTypeApi(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        objs = LinkType.objects.all()

        if objs is not None:
            serializer = LinkTypeSerializer(objs, many=True)
            return Response(
                {
                    "success": True,
                    "message": "List of LinkType objects",
                    "data": serializer.data,
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {
                "success": False,
                "message": "No LinkType objects exists",
                "data": {},
            },
            status=status.HTTP_404_NOT_FOUND,
        )


class ListLinkInfoApi(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        objs = LinkInfo.objects.all()

        if objs is not None:
            serializer = LinkInfoSerializer(objs, many=True)
            return Response(
                {
                    "success": True,
                    "message": "List of LinkInfo objects",
                    "data": serializer.data,
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {
                "success": False,
                "message": "No LinkInfo objects exists",
                "data": {},
            },
            status=status.HTTP_404_NOT_FOUND,
        )


class ListLinkInfoApiFilters(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = LinkInfoSerializer
    queryset = LinkInfo.objects.all()
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = LinkInfoFilter
    ordering_fields = ['sortOrderId']

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        count = len(response.data)
        response.data = {
            'success': True,
            'message': 'List of LinkInfo objects',
            'count': count,
            'data': response.data, 
            }
        return response


class ListLinkInfoApiTreeView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = LinkInfoSerializer
    queryset = LinkInfo.objects.all()
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = LinkInfoFilter
    ordering_fields = ['sortOrderId']

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        # print(response)
        # print(response.data)
        # print(type(response.data))

        resultlist = []
        datalist = response.data

        for data in datalist:
            if(data['parentId'] == None):
                resultlist.append(data)
        
        print(len(resultlist))
        


        response.data = {
            'success': True,
            'message': 'List of LinkInfo objects',
            'data': response.data, 
            }
        return response



@csrf_exempt
@api_view(['GET', 'POST'])
def set_sorting_order(request):

    returnobj = {}
    objs = []
    error_occured = False
    objIdList = request.data.get("linkInfoIdList")
    # print("objIdList")
    # print(objIdList)
    # return Response({"success": True}, status=status.HTTP_200_OK)
    # return Response({"success": False}, status=status.HTTP_400_BAD_REQUEST)

    for id in objIdList:
        try:
            objs.append(LinkInfo.objects.get(id=id))
        except LinkInfo.DoesNotExist:
            error_occured = True

    if(error_occured):
        returnobj["success"] = False
        returnobj["message"] = "Error Occured while updating fields"
        returnobj["data"] = {}
        return Response(returnobj, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
        returnobj["success"] = False
        returnobj["message"] = "Error Occured while updating fields"
        returnobj["data"] = {}
        return Response(returnobj, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    returnobj["success"] = True
    returnobj["message"] = "Updated sorted order successfully"
    returnobj["data"] = {}

    return Response(returnobj, status=status.HTTP_200_OK)


def build_tree(objects):
    # Create a dictionary to store the parent-child relationships
    parent_child_map = defaultdict(list)
    # print("parent_child_map:-")
    # print(parent_child_map)
    for obj in objects:
        parent_child_map[obj['parentId']].append(obj)
    # Recursively traverse the dictionary to build the tree
    def build_branch(parent_id):
        branch = []
        for child in parent_child_map.get(parent_id, []):
            branch.append({
                'id': child['id'],
                'name': child['name'],
                'url': child['url'],
                'linkTypeId': child['linkTypeId'],
                'parentId': child['parentId'],
                'useExternalUrl': child['useExternalUrl'],
                'externalUrl': child['externalUrl'],
                'openInExternalWindow': child['openInExternalWindow'],
                'sortOrderId': child['sortOrderId'],
                'children': build_branch(child['id'])
            })
        return branch
    # Return the tree rooted at the parent with id None
    return build_branch(None)



@api_view(['GET'])
def get_link_infos_tree_view(request):

    found_in_cache = True
    # look for list_link_info_tree_view_obj object in cache
    treeview = cache.get("list_link_info_tree_view_obj")

    # If not found, create object, save in cache and return respinse
    if treeview is None:
        found_in_cache = False
        datalist = []
        objs = LinkInfo.objects.filter(isEnabled=True).order_by("sortOrderId")

        for obj in objs:
            temp = {}
            temp["id"] = obj.id
            temp["name"] = obj.name
            temp["url"] = obj.url

            if(obj.linkTypeId is not None):
                temp["linkTypeId"] = obj.linkTypeId.id
            else:
                temp["linkTypeId"] = None

            if(obj.parentId is not None):
                temp["parentId"] = obj.parentId.id
            else:
                temp["parentId"] = None

            temp["useExternalUrl"] = obj.useExternalUrl
            temp["externalUrl"] = obj.externalUrl
            temp["openInExternalWindow"] = obj.openInExternalWindow
            temp["sortOrderId"] = obj.sortOrderId
            temp["children"] = []
            datalist.append(temp)

        treeview = build_tree(datalist)
        cache.set("list_link_info_tree_view_obj", treeview)

        # with open("tempfiles/listInfoTreeViewOutput.txt", mode="w") as file_object:
        #     pprint(treeview, stream=file_object)
    
        # print(datalist)
        # print(json.dumps(treeview))

    print("FOUND IN CACHEE") if(found_in_cache) else print("NOT FOUND IN CACHE")

    return Response({
        "success": True,
        "message": "List of all Link infos in tree view", 
        "data" : treeview
    }, status=status.HTTP_200_OK)





