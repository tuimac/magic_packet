#!/bin/bash

curl -X POST -H "Content-Type: application/json" -d '{"macaddr": "02:42:ac:11:00:02"}' http://localhost/api/sendpacket

curl -X POST -H "Content-Type: application/json" -d '{"ip": "8.8.8.8"}' http://localhost/api/ping
