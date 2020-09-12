command = '/opt/branch-contacts/myvenv/bin/gunicorn'
pythonpath = '/opt/branch-contacts/orgbranchs'
bind = '127.0.0.1:8001'
workers = 3
user = 'branch-contacts'
limit_request_fields = 32000
limit_request_field_size = 0
raw_env = 'DJANGO_SETTINGS_MODULE=orgbranchs.settings'
