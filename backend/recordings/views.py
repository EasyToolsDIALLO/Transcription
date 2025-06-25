from rest_framework import viewsets
from .models import Recording
from .serializers import RecordingSerializer

class RecordingViewSet(viewsets.ModelViewSet):
    queryset = Recording.objects.all()
    serializer_class = RecordingSerializer

