from ..models import Gathering
from ..serializers import GatheringSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

class GatheringViewSet(viewsets.ModelViewSet):
    queryset = Gathering.objects.all()
    serializer_class = GatheringSerializer
    permission_classes = [IsAuthenticated]