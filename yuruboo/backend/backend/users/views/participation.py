from ..models import Participation
from ..serializers import ParticipationSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

class ParticipationViewSet(viewsets.ModelViewSet):
    queryset = Participation.objects.all()
    serializer_class = ParticipationSerializer
    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        gathering = self.request.query_params.get('gathering')
        participant= self.request.query_params.get('participant')

        queryset = Participation.objects.filter(gathering=gathering, participant=participant)

        return queryset

 