from django.contrib.auth.models import User
from django.db import models
from django.conf import settings


class Message(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    text = models.CharField(max_length=1000)


class Chat(models.Model):
    name = models.CharField(max_length=50)
    users = models.ManyToManyField(User)
    messages = models.ManyToManyField(Message)

    def __str__(self):
        return self.name


class UserInfo(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name='user_info')
    chats = models.ManyToManyField(Chat)
