"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from app import views
from frontend.src.features import home
from django.urls import include, path

from app.views.genre import GenreViewSet
from app.views.gathering import GatheringViewSet
from app.views.ownership import OwnershipViewSet
from app.views.message import MessageViewSet
from app.views.participation import ParticipationViewSet

router = routers.DefaultRouter()
router.register('genres', GenreViewSet)
router.register('gatherings',GatheringViewSet)
router.register('ownerships',OwnershipViewSet)
router.register('messages',MessageViewSet)
router.register('participations',ParticipationViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('auth.urls')),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/',include('djoser.urls.jwt')),
    path('api/auth/', views.home(), name='home'),
    path('api/auth/', Home.as_view(), name='home'),
    path('blog/', include('blog.urls')),
    path('', include(router.urls)),
]
