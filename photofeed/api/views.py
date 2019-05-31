from django.shortcuts import render

from django.http import HttpResponse, JsonResponse

from .models import Image

def index(request):
    return HttpResponse("Hello world")


def feed(request):
    response = []

    for i in Image.objects.all():
        response.append({
            "id": i.id,
            "title": i.title,
            "url": i.url,
            "width": i.width,
            "height": i.height,
            "creation_date": i.creation_date
            })

    return JsonResponse({
        "images": response
        })