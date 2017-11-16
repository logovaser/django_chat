from django.conf.urls import url
from .. import views
from rest_framework.authtoken import views as rest_views


urlpatterns = [
    url(r'^check/$', views.check),
    url(r'^login/$', views.login),
    url(r'^register/$', views.register),
    url(r'^logout/$', views.logout),

    url(r'^mail/context$', views.mail_page_context),

    url(r'^api_token_auth/', rest_views.obtain_auth_token)
]
