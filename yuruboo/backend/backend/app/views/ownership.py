from ..models import Ownership
from ..serializers import OwnershipSerializer
from rest_framework import viewsets
from rest_framework.permissions import AllowAny

class OwnershipViewSet(viewsets.ModelViewSet):
    queryset = Ownership.objects.all()
    serializer_class = OwnershipSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        owner = self.request.query_params.get('owner')

        params = {}

        if owner:
            params['owner'] = owner

        queryset = Ownership.objects.filter(**params)

        return queryset