#!/usr/bin/env python3

import time
import socket
import sys
from threading import Thread
import traceback
import struct

def createPacket(macaddr):
    return b'\xff' * 6 + (struct.pack('BBBBBB', *([int(octet, 16) for octet in macaddr.split(':')]))) * 16

def sendPacket(packet):
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
    sock.sendto(packet, ('255.255.255.255', 7))

def confirmWakeup():
    def createPacket():
        ((8 << 8) << 16)
        # RFC 1071

    def sendpacket(ip, packet):
        sock = socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_ICMP)
        sock.sendto(packet, (ip, 0))
        return sock.recv(512)
        
    packet = createPacket()
    data = sendPacket('node-master', packet)
    print(data)

if __name__ == '__main__':
    '''
    if len(sys.argv) == 1:
        exit(1)
    macaddr = sys.argv[1]
    packet = createPacket(macaddr)
    sendPacket(packet)
    '''
    confirmWakeup()

