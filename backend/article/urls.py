# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('create/category/',views.CreateArticleCategoryView.as_view(),name='category-create'),
    path('list/', views.ArticleListView.as_view(), name='article-list'),
    path('create/', views.ArticleCreateView.as_view(), name='article-create'),
    path('detail/<int:pk>/', views.ArticleDetailView.as_view(), name='article-detail'),
    path('interactions/<int:article_id>/',views.ArticleInteractions.as_view(),name='article-interactions')
]
