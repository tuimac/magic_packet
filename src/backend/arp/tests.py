#!/usr/bin/env python3

import socket
import struct
import fcntl

def get_interface() -> str:
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.connect(('8.8.8.8', 0))
    default_ip = sock.getsockname()[0]
    for ifname in socket.if_nameindex():
        try:
            if default_ip == socket.inet_ntoa(fcntl.ioctl(sock.fileno(), 0x8915, struct.pack('256s', ifname[1].encode()))[20:24]):
                return ifname[1]
        except:
            pass
    
if __name__ == '__main__':
    print(get_interface())
