from django.db import models
from channels.models import Channel
from django.contrib.auth.models import User
# Create your models here.

class Video(models.Model):
	channel = models.OneToOneField(Channel,on_delete=models.CASCADE)
	video_file = models.FileField(upload_to="videos")
	title = models.CharField(max_length=300)
	description = models.TextField()

class Like(models.Model):
	user = models.ForeignKey(User,on_delete=models.CASCADE)
	video = models.ForeignKey(Video,on_delete=models.CASCADE)
	like = models.BooleanField()
	dislike = models.BooleanField()
