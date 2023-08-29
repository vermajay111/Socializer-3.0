from django.db import models
from django.db import models
from django.contrib.auth.models import User

class HashTag(models.Model):
    tag = models.CharField(max_length=400)

    def __str__(self):
        return self.tag


class Post(models.Model):
    title = models.CharField(max_length=100)
    text = models.TextField(max_length=60000)
    video = models.FileField(upload_to='media/videos/', blank=True, null=True)
    hash_tag = models.ForeignKey(HashTag, on_delete=models.CASCADE, null=True, blank=True)
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)
    dislikes = models.ManyToManyField(User, related_name='disliked_posts', blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.title


class Image(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='media/images/', blank=True, null=True)

    def __str__(self):
        return self.image.name
        
class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(max_length=5000)
    created_date = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ['-created_date']
        
    def __str__(self):
        return f'{self.author.username} commented on {self.post.title}'
    
