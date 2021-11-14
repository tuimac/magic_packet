#!/bin/bash

cd /root/magic_packet/src/frontend
npm start &

python3 /root/magic_packet/src/backend/manage.py runserver 0.0.0.0:8000 &

/usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/nginx.conf
