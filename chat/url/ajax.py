from django.conf.urls import url
from .. import views

urlpatterns = [
    url(r'^check/$', views.check),
    url(r'^login/$', views.login),
    url(r'^register/$', views.register),
    url(r'^logout/$', views.logout),

    url(r'^chats/$', views.chats),
    url(r'^chats/create/$', views.create_chat),
    url(r'^chats/add_user/$', views.add_user),

    url(r'^messages/(?P<pk>\d+)/$', views.messages),
    url(r'^messages/send/$', views.send_message),

    url(r'^users/find/(?P<keyword>[\w\W]+)$', views.find_user),
]
