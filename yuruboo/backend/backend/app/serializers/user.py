from rest_framework import serializers
from users.models import CustomUser


class CustomUserSerializer(serializers.Serializer):
    class Meta:
        model = CustomUser
        fields = ('id','email', 'user_name', 'is_staff','is_active','profile', 'color')