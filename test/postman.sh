#!/bin/bash

curl -X POST -H "Content-Type: application/json" -d '{"macaddr": "02:42:ac:11:00:02"}' http://localhost/api/sendpacket | jq

curl -X GET http://localhost/api/ping/10.0.222.7/ | jq

curl -X GET http://localhost/api/arp/10.0.222.7/ | jq
