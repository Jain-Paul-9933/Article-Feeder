from rest_framework import generics, permissions,status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Article,UserInteraction,ArticleCategory
from .serializers import ArticleSerializer,UserInteractionSerializer,ArticleCategorySerializer


class ArticleCreateView(generics.CreateAPIView):
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class CreateArticleCategoryView(generics.CreateAPIView):
    queryset = ArticleCategory.objects.all()
    serializer_class = ArticleCategorySerializer
    permission_classes = [permissions.IsAdminUser] 

class ArticleListView(generics.ListAPIView):
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Article.objects.filter(author=self.request.user)

class ArticleDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Article.objects.filter(author=self.request.user)

class ArticleInteractions(APIView):

    permission_classes=(IsAuthenticated,)

    def post(self,request,article_id):

        try:
            article=Article.objects.get(pk=article_id)
        except Article.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer=UserInteractionSerializer(data=request.data)

        if serializer.is_valid():

            interaction,created=UserInteraction.objects.get_or_create(
                user=request.user,
                article=article,
                defaults={"liked":False,"disliked":False,"blocked":False}
            )


            if "like" in request.data:
                interaction.like()
            elif "dislike" in request.data:
                interaction.dislike()
            elif "block" in request.data:
                interaction.block()

            return Response(status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)