from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.decorators import api_view
from django_filters.rest_framework import DjangoFilterBackend 
from app_cms.models import LinkInfo, LinkType
from .serializers import LinkInfoSerializer, LinkTypeSerializer
from .filters import LinkInfoFilter


class LinkTypeApi(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        id = request.data.get("id")

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
        id = request.data.get("id")

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
        print(request.data)
        serializer = LinkInfoSerializer(data=request.data)
        print(serializer.is_valid())
        if serializer.is_valid():
            print("serializer is valid")
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
    queryset = LinkInfo.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = LinkInfoFilter