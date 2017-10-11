from django.conf.urls import url, include

urlpatterns = [
    url(r'^', include('chat.url.site')),
    url(r'^ajax/', include('chat.url.ajax')),
    url(r'^django_web_chat/', include('django_web_chat.urls', namespace='django_web_chat')),
]
