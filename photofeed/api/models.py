from django.db import models


class Image(models.Model):
    url = models.URLField(max_length=1024)
    creation_date = models.DateTimeField('creation date')

    def __str__(self):
        return self.url
