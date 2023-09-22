from django.urls import path
from  .import views
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('register/',views.UserRegistrationView.as_view(), name='register'),
    path('token/',views.MyTokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('token/refresh/',jwt_views.TokenRefreshView.as_view(),name='token_refresh'),
    path('logout/',views.LogoutView.as_view(),name='logout'),
    path('update/',views.UpdateUserView.as_view(),name='update-user'),
]