#!/usr/bin/env python3

import socket
import struct
import fcntl

def encode_ipaddr(ipaddr: str) -> str:
    result = 0
    octets = ipaddr.split('.')
    for i in range(0, 4):
        result += int(octets[i]) << (len(octets) - i - 1) * 8
    return result

def encode_macaddr(macaddr: str) -> str:
    result = 0
    octets = []
    if '-' in macaddr:
        octets = macaddr.split('-')
    elif ':' in macaddr:
        octets = macaddr.split(':')
    for i in range(0, 6):
        result += int(octets[i], 16) << (len(octets) - i - 1) * 8
    return result

def get_ip(interface: str) -> str:
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    return socket.inet_ntoa(fcntl.ioctl(sock.fileno(), 0x8915, struct.pack('256s', interface.encode())[20:24]))

def arp_request(interface, src_ip, dest_ip, src_mac):
    # Create L2 socket
    sock = socket.socket(socket.AF_PACKET, socket.SOCK_RAW)
    sock.bind((interface, 0))
    
    # Create request datagram
    packet = struct.pack('!HHBBHHHHH', 1, 0x0806, 6, 4, 1, )

if __name__ == '__main__':
    #arp_request('eth0')
    get_ip('eth0')
