from django.db import models
from authentification.models import CustomUser

class Article(models.Model):
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='article_images/')
    tags = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
class ArticleCategory(models.Model):
    name= models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Preferences(models.Model):
    name = models.CharField(max_length=255)
    # Add fields relevant to user preferences

    def __str__(self):
        return self.name
    
class UserInteraction(models.Model):
    user=models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    article=models.ForeignKey(Article,on_delete=models.CASCADE)
    liked=models.BooleanField(default=False)
    disliked=models.BooleanField(default=False)
    blocked=models.BooleanField(default=False)

    def like(self):
        self.liked=True
        self.disliked=False
        self.blocked=False
        self.save()

    def dislike(self):
        self.liked=False
        self.disliked=True
        self.blocked=False
        self.save()

    def block(self):
        self.liked=False
        self.disliked=False
        self.blocked=True
        self.save()

    def __str__(self):
        return f"{self.user.username} - {self.article.name} Interaction"