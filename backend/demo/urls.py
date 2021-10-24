from django.urls import include, path
from rest_framework import routers
from demo.views import NoteViewSet

router = routers.DefaultRouter()
router.register(r'notes', NoteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]