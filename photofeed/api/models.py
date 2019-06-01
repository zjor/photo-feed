from django.db import models

class ImageManager(models.Manager):

    def get_page(self, last_timestamp=None, last_id=None, page_size=10):
        query = Image.objects.all()

        if last_timestamp:
            query = query.filter(creation_date__lte=last_timestamp)
        
        if last_id:
            query = query.filter(id__gt=last_id)

        return query[:page_size]

class Image(models.Model):
    objects = models.Manager()
    images = ImageManager()

    title = models.CharField(max_length=255)
    url = models.URLField(max_length=1024)
    width = models.IntegerField()
    height = models.IntegerField()
    creation_date = models.DateTimeField('creation date')

    def __str__(self):
        return self.url

    class Meta:
        ordering = ['-creation_date', 'id']

