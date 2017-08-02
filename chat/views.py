import json

from django.contrib.auth import authenticate, logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import login as auth_login
from django.core.serializers import serialize

from .models import Chat, Message, UserInfo
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
    user = User.objects.create_user(username=post['login'], password=post['password'])
    UserInfo.objects.create(user_id=user.id)
    return JsonResponse({'type': 'success'})


def logout(request):
    auth_logout(request)
    return HttpResponse(status=200)


def chats(request):
    user_info = request.user.user_info

    result = {
        'chats': []
    }
    for chat in user_info.chats.all():
        result['chats'].append({
            'id': chat.id,
            'name': chat.name
        })
    return JsonResponse(result)


def add_user(request):
    post = json.loads(request.body)
    user_info = request.user.user_info
    user_to_add = None

    try:
        add_to_chat = user_info.chats.get(id=post['chat_id'])
    except ObjectDoesNotExist:
        return HttpResponse(status=404)

    try:
        add_to_chat.users.get(id=request.user.id)
    except ObjectDoesNotExist:
        return HttpResponse(status=403)

    try:
        user_to_add = User.objects.get(username=post['username'])
    except ObjectDoesNotExist:
        return HttpResponse(status=404)

    add_to_chat.users.add(user_to_add)
    add_to_chat.save()
    user_to_add.user_info.chats.add(add_to_chat)
    user_to_add.save()

    return HttpResponse(status=200)


def messages(request, pk):
    chat_messages = Message.objects.filter(chat_id=pk)

    result = {
        'messages': []
    }
    for message in chat_messages:
        result['messages'].append({
            'id': message.id,
            'text': message.text
        })
    return JsonResponse(result)


def send_message(request):
    post = json.loads(request.body)

    Message.objects.create(text=post['text'], chat_id=post['chat_id'], author_id=request.user.id)

    return HttpResponse(status=200)


def create_chat(request):
    post = json.loads(request.body)

    user_info = request.user.user_info

    new_chat = Chat.objects.create(name=post['name'])
    new_chat.users.add(request.user)

    user_info.chats.add(new_chat)
    user_info.save()

    return HttpResponse(status=200)


def find_user(request, keyword):
    users = User.objects.filter(username__startswith=keyword)[:10]
    result = {
        'users': []
    }

    for user in users:
        result['users'].append(user.username)

    return JsonResponse(result)
