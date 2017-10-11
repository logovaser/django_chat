import json

from django.contrib.auth import authenticate, logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import login as auth_login
from django.urls import reverse

from django_web_chat.models import ChatUser

from .utils import get_user_info


def index(request):
    return render(request, 'chat/base.html')


@login_required
def check(request):
    return JsonResponse({
        'type': 'success',
        'user': get_user_info(request.user)
    })


def login(request):
    post = json.loads(request.body)
    user = authenticate(username=post['login'], password=post['password'])
    if user:
        auth_login(request, user)
        return JsonResponse({
            'type': 'success',
            'user': get_user_info(user)
        })
    return HttpResponse(status=403)


def register(request):
    post = json.loads(request.body)
    User.objects.create_user(username=post['login'], password=post['password'])
    return JsonResponse({'type': 'success'})


@login_required
def logout(request):
    auth_logout(request)
    return HttpResponse(status=200)


@login_required
def mail_page_context(request):
    if request.user.is_authenticated() and ChatUser.objects.filter(user=request.user, is_deleted=False).exists():
        chat_user = ChatUser.objects.get(user=request.user)
        room_objs = [m.room for m in chat_user.room_memberships.all().prefetch_related('room')]
    else:
        room_objs = []

    rooms = [{
        'id': room.id,
        'name': room.name,
        'status': 'inactive'
    } for room in room_objs]
    if rooms:
        rooms[0]['status'] = 'active'

    result = {
        'urls': {
            'default_template': reverse('django_web_chat:default-template'),
            'get_recent_messages': reverse('django_web_chat:get-recent-messages', args=(1234567890, )),
        },
        'rooms': rooms,
    }

    return JsonResponse(result)
