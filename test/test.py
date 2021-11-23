#!/usr/bin/env python3

import time
import socket
import sys
from threading import Thread
import traceback
import struct

def createPacket(macaddr):
    packet = b''
    macBin = struct.pack('BBBBBB', *([int(octet, 16) for octet in macaddr.split(':')]))
    packet = b'\xff' * 6
    packet = packet + macBin * 16
    print(packet)
    return packet

def sendPacket(packet):
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
    sock.sendto(packet, ('255.255.255.255', 7))

def confirmWakeup():
    pass

if __name__ == '__main__':
    if len(sys.argv) == 1:
        exit(1)
    macaddr = sys.argv[1]
    packet = createPacket(macaddr)
    sendPacket(packet)
    #confirmWakeup()

