from ..models import Ownership
from users.models import CustomUser
from ..serializers import GetFlowerColorSerializer
from rest_framework import viewsets


class GetFlowerColorViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = GetFlowerColorSerializer
