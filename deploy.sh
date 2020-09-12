#!/bin/bash
# Enable virtualenv ./venv
source ./myvenv/bin/activate
git pull origin
python ./manage.py migrate
python ./manage.py collectstatic --noinput
# Restart Apache mod_wsgi daemon
# touch --no-dereference ./config/uwsgi/ud.ini
# Deactivate virtualenv
deactivate
