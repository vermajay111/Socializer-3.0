from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Post
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from .serializers import PostSerializer,CommentSerializer
from rest_framework.authtoken.models import Token
from .models import Comment

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_all_posts(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def like_post(request):
    raw_auth_header = request.META.get('HTTP_AUTHORIZATION', '')
    user_token = raw_auth_header.replace('token ', '')
    pk = request.data['pk']

    user = get_object_or_404(User, auth_token=user_token)
    post = get_object_or_404(Post, id=pk)

    if user not in post.dislikes.all():
        if user in post.likes.all():
            post.likes.remove(user)
        else:
            post.likes.add(user)
    else:
        if user in post.dislikes.all():
            post.dislikes.remove(user)
            post.likes.add(user)

    post.likes.set(post.likes.all())
    post.save()

    # Create a custom response dictionary with likes and dislikes for the specific post
    response_data = {
        "likes": [like.username for like in post.likes.all()],
        "dislikes": [dislike.username for dislike in post.dislikes.all()],
    }

    return Response(response_data)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def dislike_post(request):
    raw_auth_header = request.META.get('HTTP_AUTHORIZATION', '')
    user_token = raw_auth_header.replace('token ', '')
    pk = request.data['pk']

    user = get_object_or_404(User, auth_token=user_token)
    post = get_object_or_404(Post, id=pk)

    if user not in post.likes.all():
        if user in post.dislikes.all():
            post.dislikes.remove(user)
        else:
            post.dislikes.add(user)
    else:
        if user in post.likes.all():
            post.likes.remove(user)
            post.dislikes.add(user)

    post.likes.set(post.likes.all())
    post.save()
    response_data = {
        "likes": [like.username for like in post.likes.all()],
        "dislikes": [dislike.username for dislike in post.dislikes.all()],
    }

    return Response(response_data)
   
    
    
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def comment_on_post(request, pk):
    raw_auth_header = request.META.get('HTTP_AUTHORIZATION', '')
    user_token = raw_auth_header.replace('token ', '')
    user = get_object_or_404(User, auth_token=user_token)
    post = get_object_or_404(Post, id=pk)
    comment = Comment(post=post, author=user, text=request.data['text'])
    comment.save()

    comments = Comment.objects.filter(post=post)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)