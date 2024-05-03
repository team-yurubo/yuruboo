from django.db import models
from .user import CustomUser
from .gathering import Gathering

import uuid

class Participation(models.Models):
    id : models.UUIDField = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    gathering : models.ForeignKey = models.ForeignKey(Gathering, on_delete=models.PROTECT, on_update=models.CASCADE, help_text="募集")
    paticipant : models.ForeignKey = models.ForeignKey(CustomUser, on_delete=models.PROTECT, on_update=models.CASCADE, help_text="参加者")
    