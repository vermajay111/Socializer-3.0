
from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_all_posts),
    path('like_post/<int:pk>', views.like_post),
    path('dislike_post/<int:pk>', views.dislike_post),
    path('comment_post/<int:pk>', views.comment_on_post)
] 
