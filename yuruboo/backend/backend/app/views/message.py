from ..models import Message
from ..serializers import MessageSerializer
from rest_framework import viewsets

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def get_queryset(self):
        gathering = self.request.query_params.get('gathering')

        params = {}

        if gathering:
            params['gathering'] = gathering

        queryset = Message.objects.filter(**params)

        return queryset