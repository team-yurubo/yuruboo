from django.urls import path
from . import views

urlpatterns = [ 
    path('',views.CustomUserViewSet.as_view(),name=''),
    path('',views.CustomUserViewSet.as_view(),name=''),
]
