from ..models import Gathering
from ..serializers import GatheringSerializer
from rest_framework import viewsets

class GatheringViewSet(viewsets.ModelViewSet):
    queryset = Gathering.objects.all()
    serializer_class = GatheringSerializer
