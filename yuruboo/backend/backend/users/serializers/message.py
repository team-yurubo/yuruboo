from rest_framework import serializers
from ..models import Message

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ["id", "gathering", "body", "sender", "created_at"]