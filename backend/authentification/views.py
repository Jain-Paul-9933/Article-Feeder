from .models import CustomUser
from .serializers import UserSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password


class UserRegistrationView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):

        password = serializer.validated_data.get('password')

        hashed_password = make_password(password)

        serializer.save(password=hashed_password)

