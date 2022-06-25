#!/bin/bash

cd /root/magic_packet/src/frontend
npm start &

gunicorn -c /etc/gunicorn/gunicorn.conf.py &

/usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/nginx.conf
