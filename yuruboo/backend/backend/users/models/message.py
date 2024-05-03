from django.db import models
from .user import CustomUser
from .gathering import Gathering

import uuid

class Message(models.Models):
    id : models.UUIDField = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    gathering : models.ForeignKey = models.ForeignKey(Gathering, on_delete=models.PROTECT, on_update=models.CASCADE, help_text="募集")
    body : models.CharField = models.CharField(max_length=1024, help_text="本文")
    sender : models.ForeignKey = models.ForeignKey(CustomUser, on_delete=models.PROTECT, on_update=models.CASCADE, help_text="送り手")
    create_at : models.DateTimeField = models.DateTimeField(auto_now_add=True, help_text="投稿日時")
    