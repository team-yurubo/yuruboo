from users.models import CustomUser
from ..serializers.user import CustomUserSerializer
from rest_framework import viewsets
from rest_framework.permissions import AllowAny

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes =[AllowAny]