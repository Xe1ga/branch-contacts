#!/bin/bash
source /opt/branch-contacts/myvenv/bin/activate
exec gunicorn -c "/opt/branch-contacts/orgbranchs/gunicorn_config.py" orgbranchs.wsgi
