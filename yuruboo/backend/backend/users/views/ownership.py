from ..models import Ownership
from ..serializers import OwnershipSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

class OwnershipViewSet(viewsets.ModelViewSet):
    queryset = Ownership.objects.all()
    serializer_class = OwnershipSerializer
    permission_classes = [IsAuthenticated]