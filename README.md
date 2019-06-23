## Commands

- `python3 manage.py runserver` runs development server
- `python3 manage.py loaddata [0001_users | 0002_images]` initializes database with fixture data

## Issues

- fix env variables in docker-compose
- upload error handling
- unit tests for upload flow
- responsive design for upload
- keep original size & thumbnail
- dialog with original image size

## Spec

https://docs.google.com/document/d/1BSBIbcArwyL_cS74pQW2A-WFqnD71oRyLDkCfN_2xq4/edit#heading=h.iu7iyfu0tlll


## Frontend routes

- / - feed
- /#/new - new image dialog
- /#/images/:id/ - selected image in the feed
- /#/images/:id/details - single page with selected image
- /#/login - shows login dialog
- /#/register - shows register dialog

## API

- GET /api/feed?page_size=10&last_timestamp=111
- POST /api/post multipart: image, title - posts new image

- GET, POST, DELETE /api/images/:id - manipulate with a single image
