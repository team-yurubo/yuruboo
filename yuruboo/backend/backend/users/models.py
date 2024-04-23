from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models

from .managers import CustomUserManager


# Create your models here.
class CustomUser(AbstractBaseUser, PermissionsMixin):

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('first_name', 'last_name',)

    is_staff = models.BooleanField(
        default=False,

    )
    is_active = models.BooleanField(
        default=True,
    )

    objects = CustomUserManager()

    @property
    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'

    def __str__(self) -> str:
        return self.email