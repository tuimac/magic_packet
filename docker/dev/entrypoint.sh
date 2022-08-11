#!/bin/bash

BASE_DIR='/root'

cd $BASE_DIR
git clone https://github.com/tuimac/magic_packet

cd ${BASE_DIR}/magic_packet/src/frontend
npm ci
npm start &

cd $BASE_DIR/magic_packet/src/backend
gunicorn -c /etc/gunicorn/gunicorn.conf.py &

/usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/nginx.conf
