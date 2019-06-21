FROM python:3.7-stretch

RUN apt-get update -y && apt-get install -y postgresql-client

# The enviroment variable ensures that the python output is set straight
# to the terminal with out buffering it first
ENV PYTHONUNBUFFERED=1

ADD requirements.txt /requirements.txt

RUN pip install -r /requirements.txt

RUN mkdir /photofeed

WORKDIR /photofeed

ADD . /photofeed/

# git commit to be proparated to an endpoint
ARG GIT_COMMIT
ENV GIT_COMMIT=${GIT_COMMIT}

# Cloudinary API secret
ARG CLOUDINARY_API_SECRET
ENV CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}