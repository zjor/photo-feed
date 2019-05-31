from django.db import models


class Image(models.Model):
    title = models.CharField(max_length=255)
    url = models.URLField(max_length=1024)
    width = models.IntegerField()
    height = models.IntegerField()
    creation_date = models.DateTimeField('creation date')

    def __str__(self):
        return self.url
