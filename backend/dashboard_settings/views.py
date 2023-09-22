from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from article.models import Article
from article.serializers import ArticleSerializer

class Dashboard(APIView):

    permission_classes=(IsAuthenticated,)

    def get(self,request):

        articles=Article.objects.all()

        serializer=ArticleSerializer(articles,many=True)

        return Response(serializer.data)