#!/usr/bin/env python3

import socket
import struct
import fcntl

def encode_ipaddr(ipaddr: str) -> str:
    result = 0
    octets = ipaddr.split('.')
    for i in range(0, 4):
        result += int(octets[i]) << (len(octets) - i - 1) * 8
    return bytes(result)

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
    #return socket.inet_ntoa(fcntl.ioctl(sock.fileno(), 0x8915, struct.pack('256s', interface.encode()))[20:24])
    return fcntl.ioctl(sock.fileno(), 0x8915, struct.pack('256s', interface.encode()))[20:24]

def get_macaddr(interface: str) -> str:
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    #return fcntl.ioctl(s.fileno(), 0x8927,  struct.pack('256s', interface.encode()))
    return int.from_bytes(fcntl.ioctl(sock.fileno(), 0x8927,  struct.pack('256s', interface.encode()))[18:24], 'big')

def get_interface_info(interface: str) -> dict:
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    info = dict()
    info['ip'] = fcntl.ioctl(sock.fileno(), 0x8915, struct.pack('256s', interface.encode()))[20:24]
    info['mac'] = fcntl.ioctl(sock.fileno(), 0x8927,  struct.pack('256s', interface.encode()))[18:24]
    return info

def arp_request(interface, dest_ip):
    # Create L2 socket
    sock = socket.socket(socket.AF_PACKET, socket.SOCK_RAW)
    sock.bind((interface, 0))
    if_info = get_interface_info(interface)

    # Create request datagram
    packet = struct.pack('!HHBBH6s4s6s4s', 1, 0x0806, 6, 4, 1, if_info['mac'], if_info['ip'], bytes(0), encode_ipaddr(dest_ip))
    sock.send(packet)

if __name__ == '__main__':
    arp_request('eth0', '10.0.222.6')
