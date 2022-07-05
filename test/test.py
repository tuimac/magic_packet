#!/usr/bin/env python3

import socket

if __name__ == '__main__':
    ipaddr = '10.0.222.7'
    print(socket.inet_aton(ipaddr))
