from django.contrib import admin
from .models import Chat, Message


admin.site.register(Chat, admin.ModelAdmin)
admin.site.register(Message, admin.ModelAdmin)
