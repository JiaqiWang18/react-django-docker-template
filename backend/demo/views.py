from django.shortcuts import render
from rest_framework import viewsets
from demo.models import Note
from demo.serializers import NoteSerializer

# Create your views here.
class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer