from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.shortcuts import get_object_or_404
from .models import IPO
from .serializers import IPOSerializer, RegisterSerializer


# ----------------- User Registration View (Public) -----------------
class RegisterView(APIView):
    permission_classes = [AllowAny]  # Anyone can register

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ----------------- IPO List and Create (Protected) -----------------
class IPOListCreateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]  # Require login

    def get(self, request):
        ipos = IPO.objects.all()
        serializer = IPOSerializer(ipos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = IPOSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ----------------- IPO Detail (Retrieve, Update, Delete) (Protected) -----------------
class IPODetailView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]  # Require login

    def get(self, request, pk):
        ipo = get_object_or_404(IPO, pk=pk)
        serializer = IPOSerializer(ipo)
        return Response(serializer.data)

    def put(self, request, pk):
        ipo = get_object_or_404(IPO, pk=pk)
        serializer = IPOSerializer(ipo, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        ipo = get_object_or_404(IPO, pk=pk)
        ipo.delete()
        return Response({"message": "IPO deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
