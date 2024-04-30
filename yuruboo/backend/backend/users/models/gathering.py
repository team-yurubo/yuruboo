from django.db import models
from .user import CustomUser 
from .genre import Genre

import uuid

class Gathering(models.Models):
    id : models.UUIDField = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pos_lat : models.FloatField =  models.FloatField(help_text="募集場所_緯度")
    pos_lut : models.FloatField =  models.FloatField(help_text="募集場所_経度")
    host : models.ForeignKey = models.ForeignKey(CustomUser, on_delete=models.PROTECT, on_update=models.CASCADE, help_text="募集者")
    genre : models.ForeignKey = models.ForeignKey(Genre, on_delete=models.PROTECT, on_update=models.CASCADE, help_text="ジャンル")
    body : models.CharField = models.CharField(max_length=1024, help_text="本文")
    num_participant : models.IntegerField = models.IntegerField(help_text="人数")
    created_at : models.DateTimeField = models.DateTimeField(auto_now_add=True, help_text="募集開始日時")
    

 