from ..models import Participation
from ..serializers import ParticipationSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

class ParticipationViewSet(viewsets.ModelViewSet):
    queryset = Participation.objects.all()
    serializer_class = ParticipationSerializer
    permission_classes = [IsAuthenticated]

 