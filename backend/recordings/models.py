from django.db import models

class Recording(models.Model):
    text = models.TextField()
    audio = models.FileField(upload_to='audios/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Recording {self.id} - {self.created_at}"

