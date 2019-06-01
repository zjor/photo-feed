import datetime as dt

from django.test import TestCase

from .models import Image


class ImageModelTest(TestCase):

    def test_fetch_all(self):
        Image.objects.create(
            title="Title",
            url="https://google.com",
            width=500,
            height=300,
            creation_date=dt.datetime.now())
        images = Image.objects.all()
        self.assertTrue(len(images) > 0)
