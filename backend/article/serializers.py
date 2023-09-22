from rest_framework import serializers
from .models import Article,UserInteraction,ArticleCategory

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

class ArticleCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleCategory
        fields = '__all__'

class UserInteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserInteraction
        fields=('id','user','article','like','dislike','block')


