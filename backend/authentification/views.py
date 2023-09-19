from .models import CustomUser
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

class UserRegistrationView(generics.CreateAPIView):

    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):

        password = serializer.validated_data.get('password')

        hashed_password = make_password(password)

        serializer.save(password=hashed_password)


class LogoutView(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self,request):

        try:
            refresh_token=request.data["refresh_token"]
            token=RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        
        except Exception as e:

            return Response(status=status.HTTP_400_BAD_REQUEST)