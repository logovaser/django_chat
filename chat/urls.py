from django.conf.urls import url, include

urlpatterns = [
    url(r'^', include('chat.url.site')),
    url(r'^ajax/', include('chat.url.ajax')),
]
