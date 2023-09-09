
from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_all_posts),
    path('like_post', views.like_post),
    path('dislike_post', views.dislike_post),
    path('comment_post/<int:pk>', views.comment_on_post)
] 
