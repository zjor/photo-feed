from django.test import TestCase

from .models import Image
from django.contrib.auth.models import User


class ImageModelTest(TestCase):

    def setUp(self):
        self.author = User.objects.create_user(username="Alice", password="s3cr3t")

    def tearDown(self):
        self.author.delete()

    def test_fetch_all(self):
        Image.objects.create(author=self.author, title="Title", url="https://google.com", width=500, height=300, creation_date=1)
        images = Image.objects.all()
        self.assertTrue(len(images) == 1)

    def test_fetch_in_desc_order_by_timestamp(self):
        Image.objects.create(author=self.author, title="#1", url="https://google.com", width=0, height=0, creation_date=1)
        Image.objects.create(author=self.author, title="#2", url="https://google.com", width=0, height=0, creation_date=2)
        titles = []
        for obj in Image.objects.all():
            titles.append(obj.title)
        self.assertTrue(titles == ["#2", "#1"])

    def test_fetch_in_asc_order_by_id(self):
        Image.objects.create(author=self.author, title="#1", url="https://google.com", width=0, height=0, creation_date=1)
        Image.objects.create(author=self.author, title="#2", url="https://google.com", width=0, height=0, creation_date=1)
        titles = []
        for obj in Image.objects.all():
            titles.append(obj.title)
        self.assertTrue(titles == ["#1", "#2"])

    def test_get_page(self):
        Image.objects.create(author=self.author, title="#1", url="https://google.com", width=500, height=300, creation_date=1)
        self.assertTrue(Image.images.get_page(last_timestamp=2).count() == 1)

    def test_get_page_pagination(self):        
        Image.objects.create(author=self.author, title="#1", url="https://google.com", width=500, height=300, creation_date=1)
        Image.objects.create(author=self.author, title="#2", url="https://google.com", width=500, height=300, creation_date=2)
        self.assertTrue(Image.images.get_page(page_size=1).first().title == "#2")

    def test_should_delete_image(self):
        image_id = Image.objects.create(author=self.author, title="#1", url="https://google.com", width=500, height=300, creation_date=1).id
        self.assertEqual(1, Image.objects.count())
        image = Image.objects.get(id=image_id)
        image.delete()
        self.assertEqual(0, Image.objects.count())


