from django.conf.urls import url
from .. import views

urlpatterns = [
    url(r'^check/$', views.check),
    url(r'^login/$', views.login),
    url(r'^register/$', views.register),
    url(r'^logout/$', views.logout),

    url(r'^mail/context$', views.mail_page_context),
]
