from channels.routing import route, include

channel_routing = [
    include('django_web_chat.routing.channel_routing', path='^/web_chat'),
]
