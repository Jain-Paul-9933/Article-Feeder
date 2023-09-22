from .models import CustomUser
from .serializers import UserSerializer,MyTokenObtainPairSerializer,UpdateUserSerializer
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer

class UserRegistrationView(generics.CreateAPIView):

    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes=(AllowAny,)

    def perform_create(self, serializer):

        password = serializer.validated_data.get('password')

        hashed_password = make_password(password)

        serializer.save(password=hashed_password)

class UpdateUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UpdateUserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user
    
    def perform_update(self, serializer):
        
        if 'password' in serializer.validated_data:

            new_password=serializer.validated_data['password']
            hashed_password=make_password(new_password)
            serializer.validated_data['password']=hashed_password

        serializer.save()

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