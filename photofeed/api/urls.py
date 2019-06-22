from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('feed/', views.feed, name='feed'),
    path('post/', views.post, name='post'),
    path('images/<int:id>/', views.delete_image, name='delete_image')
]