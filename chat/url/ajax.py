from django.conf.urls import url
from .. import views

urlpatterns = [
    url(r'^check/$', views.check),
    url(r'^login/$', views.login),
    url(r'^register/$', views.register),
    url(r'^chats/$', views.chats),
    url(r'^messages/$', views.messages),
]
