#!/usr/bin/env python3

import socket
import sys

def createPacket(macaddr):
    packet = b''
    for parts in macaddr.split(':'):
        packet = packet + int(parts, 16).to_bytes(2, 'big')
    packet = packet + b'\xff' * 96
    return packet

def sendPacket(packet, ip):
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.sendto(packet, (ip, 9))

if __name__ == '__main__':
    if len(sys.argv) == 1:
        exit(1)
    macaddr = sys.argv[1]
    packet = createPacket(macaddr)
    sendPacket(packet)
    #confirmWakeup()
