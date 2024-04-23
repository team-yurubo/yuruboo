from django.db import models
import uuid

class Genre(models.Model):
    id : models.UUIDField = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name : models.CharField = models.CharField(max_length=255, help_text="ジャンル名")
    icon : models.ImageField = models.ImageField(upload_to="genre_icon", help_text="アイコン")