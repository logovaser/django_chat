import json

from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import login as auth_login


def index(request):
    return render(request, 'chat/base.html')


@login_required
def check(request):
    return JsonResponse({'type': 'success'})


def login(request):
    post = json.loads(request.body)
    user = authenticate(username=post['login'], password=post['password'])
    if user:
        login_res = auth_login(request, user)
        return JsonResponse({'type': 'success'})
    return HttpResponse(status=403)


def register(request):
    post = json.loads(request.body)
    user = User.objects.create_user(username=post['login'], password=post['password'])
    return JsonResponse({'type': 'success'})
