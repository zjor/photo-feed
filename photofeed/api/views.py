import json
import time
import cloudinary

from django.shortcuts import render

from django.http import HttpResponse, JsonResponse, HttpResponseNotFound, HttpResponseServerError
from django.views.decorators.http import require_http_methods

from .models import Image
from django.contrib.auth.models import User
from django.conf import settings

from tempfile import NamedTemporaryFile

import logging
logger = logging.getLogger(__name__)

def upload_image(f):
    with NamedTemporaryFile() as tmp:        
        for chunk in f.chunks():
            tmp.write(chunk)
            tmp.seek(0)

            upload_response = cloudinary.uploader.upload(tmp.name, width=200)
            return {
                'url': upload_response['secure_url'],
                'width': upload_response['width'],
                'height': upload_response['height']
            }


@require_http_methods(["GET"])
def index(request):
    return HttpResponse(settings.GIT_COMMIT)

@require_http_methods(["POST"])
def post(request):
    try:
        res = upload_image(request.FILES['image'])
        data = request.POST
        
        firstUser = User.objects.all()[0]
        image = Image.objects.create(
            author=firstUser, 
            title=data["title"], 
            url=res["url"], 
            width=res["width"], 
            height=res["height"], 
            creation_date=round(time.time_ns() / 1000))
        return JsonResponse({'id': image.id})
    except:
        return HttpResponseServerError("Failed to upload an image")


@require_http_methods(["GET"])
def feed(request):
    page_size = int(request.GET.get("page_size", default=10))
    
    last_timestamp = request.GET.get("last_timestamp")
    last_timestamp = int(last_timestamp) if last_timestamp else None
    
    response = {}
    images = []

    for i in Image.images.get_page(last_timestamp=last_timestamp, page_size=page_size):
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
        response["next"] = f"{request.path}?last_timestamp={images[-1]['creation_date']}&page_size=10"
    return JsonResponse(response)


@require_http_methods(["DELETE"])
def delete_image(request, id):
    try:
        image = Image.objects.get(id=id)
        image.delete()
        logger.info(f'Deleted image (ID: {id})')
        return JsonResponse({'id': id})
    except Image.DoesNotExist:
        logger.warn(f'Image was not found (ID: {id})')
        return HttpResponseNotFound()
