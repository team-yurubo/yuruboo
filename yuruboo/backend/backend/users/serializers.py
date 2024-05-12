from rest_framework import serializers
from .models import CustomUser


class UserSerializer(serializers.Serializer):
    class Meta:
        model = CustomUser
        fields = ('id','email', 'user_name', 'is_staff','is_active','profile')