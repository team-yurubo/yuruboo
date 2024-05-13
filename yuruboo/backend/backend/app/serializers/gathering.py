from rest_framework import serializers
from ..models import Gathering

class GatheringSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gathering
        fields = ["id", "pos_lat", "pos_lng", "host", "genre", "body", "num_participant", "created_at", "start_time", "budget", "title"]
        