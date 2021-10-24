from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from demo.models import Note

class NoteTestCase(APITestCase):
    def test_create_note(self):
        """
        Ensure we can create a new Note.
        """
        url = reverse('note-list')
        data = {'content': 'new note'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Note.objects.count(), 1)
        self.assertEqual(Note.objects.filter().first().content, 'new note')
    
    def test_delete_note(self):
        """
        Ensure we can delete a Note.
        """
        obj = Note(content="new note")
        obj.save()
        url = reverse('note-detail', kwargs={'pk': obj.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Note.objects.count(), 0)
