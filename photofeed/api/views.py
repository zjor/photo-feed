from django.shortcuts import render

from django.http import HttpResponse, JsonResponse

from .models import Image

def index(request):
    return HttpResponse("Hello world")


def feed(request):
    page_size = request.GET.get("page_size", default=10)
    last_timestamp = request.GET.get("last_timestamp")
    last_id = request.GET.get("last_id")

    response = {}
    images = []

    for i in Image.images.get_page(last_timestamp=last_timestamp, last_id=last_id, page_size=page_size):
        images.append({
            "id": i.id,
            "title": i.title,
            "url": i.url,
            "width": i.width,
            "height": i.height,
            "creation_date": i.creation_date
            })

    response["images"] = images

    if len(images) > 0:
        response["next"] = f"{request.build_absolute_uri('?')}?last_timestamp={images[-1]['creation_date']}&last_id={images[-1]['id']}&page_size=10"        
    return JsonResponse(response)