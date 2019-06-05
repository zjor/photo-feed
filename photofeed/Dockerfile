FROM python:3.7-stretch

RUN apt-get update -y && apt-get install -y postgresql-client

# The enviroment variable ensures that the python output is set straight
# to the terminal with out buffering it first
ENV PYTHONUNBUFFERED 1

ADD requirements.txt /requirements.txt

RUN pip install -r /requirements.txt

RUN mkdir /photofeed

WORKDIR /photofeed

ADD . /photofeed/