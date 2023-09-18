from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'first_name', 'last_name', 'email','password', 'phone', 'dob')


# class ArticleCategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model=ArticleCategory
#         fields='__all__'        