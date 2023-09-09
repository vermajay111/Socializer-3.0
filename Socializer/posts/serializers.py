from rest_framework import serializers
from .models import HashTag, Post, Image, Comment

class HashTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = HashTag
        fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    author = serializers.StringRelatedField()
    hash_tag = HashTagSerializer()

    class Meta:
        model = Post
        fields = '__all__'

    likes = serializers.SerializerMethodField()
    dislikes = serializers.SerializerMethodField()

    def get_likes(self, obj):
        return [like.username for like in obj.likes.all()]

    def get_dislikes(self, obj):
        return [dislike.username for dislike in obj.dislikes.all()]

