from django.shortcuts import render
from django.contrib.auth.models import User
from users.serializers import CurrentUserSerializer
from rest_framework import viewsets

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = CurrentUserSerializer