from django.db import models
from .user import CustomUser 

import uuid

class Ownership(models.Models):
    id : models.UUIDField = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner : models.ForeignKey = models.ForeignKey(CustomUser, on_delete=models.PROTECT, on_update=models.CASCADE, help_text="所有者")
    presenter : models.ForeignKey = models.ForeignKey(CustomUser, on_delete=models.PROTECT, on_update=models.CASCADE, help_text="贈呈者")
    count : models.IntegerField = models.IntegerField(help_text="本数")
    