#!/bin/sh
until cd /app
do
    echo "Waiting for server volume..."
done

until ./manage.py migrate
do
    echo "Waiting for db to be ready..."
    sleep 10
done

./manage.py runserver 0.0.0.0:8000
