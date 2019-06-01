import datetime as dt

from django.test import TestCase

from .models import Image


class ImageModelTest(TestCase):

    def test_fetch_all(self):
        Image.objects.create(title="Title", url="https://google.com", width=500, height=300, creation_date=dt.datetime.now())
        images = Image.objects.all()
        self.assertTrue(len(images) == 1)

    def test_fetch_in_desc_order_by_timestamp(self):
        Image.objects.create(title="#1", url="https://google.com", width=0, height=0, creation_date=dt.datetime(1970, 1, 1, 0))
        Image.objects.create(title="#2", url="https://google.com", width=0, height=0, creation_date=dt.datetime(1970, 1, 1, 1))
        titles = []
        for obj in Image.objects.all():
            titles.append(obj.title)
        self.assertTrue(titles == ["#2", "#1"])

    def test_fetch_in_asc_order_by_id(self):
        Image.objects.create(title="#1", url="https://google.com", width=0, height=0, creation_date=dt.datetime(1970, 1, 1, 0))
        Image.objects.create(title="#2", url="https://google.com", width=0, height=0, creation_date=dt.datetime(1970, 1, 1, 0))
        titles = []
        for obj in Image.objects.all():
            titles.append(obj.title)
        self.assertTrue(titles == ["#1", "#2"])

    def test_get_page(self):
        Image.objects.create(title="#1", url="https://google.com", width=500, height=300, creation_date=dt.datetime.now())
        self.assertTrue(Image.images.get_page(last_timestamp=dt.datetime.now()).count() == 1)

    def test_get_page_same_timestamp(self):
        now = dt.datetime.now()
        obj = Image.objects.create(title="#1", url="https://google.com", width=500, height=300, creation_date=now)
        Image.objects.create(title="#2", url="https://google.com", width=500, height=300, creation_date=now)
        self.assertTrue(Image.images.get_page(last_timestamp=now, last_id=obj.id).first().title == "#2")

    def test_get_page_pagination(self):        
        Image.objects.create(title="#1", url="https://google.com", width=500, height=300, creation_date=dt.datetime.now())
        Image.objects.create(title="#2", url="https://google.com", width=500, height=300, creation_date=dt.datetime.now())
        self.assertTrue(Image.images.get_page(page_size=1).first().title == "#2")

