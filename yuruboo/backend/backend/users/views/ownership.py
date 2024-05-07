from ..models import Ownership
from ..serializers import OwnershipSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

class OwnershipViewSet(viewsets.ModelViewSet):
    queryset = Ownership.objects.all()
    serializer_class = OwnershipSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        owner = self.request.query_params.get('owner')

        queryset = Ownership.objects.filter(owner=owner)

        return queryset