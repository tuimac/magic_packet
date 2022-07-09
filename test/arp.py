#!/usr/bin/env python3

import socket
import struct
import fcntl
import time

def encode_ipaddr(ipaddr: str) -> bytes:
    result = 0
    octets = ipaddr.split('.')
    for i in range(0, 4):
        result += int(octets[i]) << (len(octets) - i - 1) * 8
    return result.to_bytes(4, 'big')

def encode_macaddr(macaddr: str) -> bytes:
    result = 0
    octets = []
    if '-' in macaddr:
        octets = macaddr.split('-')
    elif ':' in macaddr:
        octets = macaddr.split(':')
    for i in range(0, 6):
        result += int(octets[i], 16) << (len(octets) - i - 1) * 8
    return result.to_bytes(6, 'big')

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
    sock = socket.socket(socket.AF_PACKET, socket.SOCK_RAW, socket.htons(0x0003))
    sock.settimeout(5)
    sock.bind((interface, 0))
    if_info = get_interface_info(interface)
    print(encode_ipaddr(dest_ip))
    print(if_info['mac'])
    
    # Create request datagram
    packet = struct.pack('!HHBBH6s4s6s4s', 0x0001, 0x0800, 0x06, 0x04, 0x0001, if_info['mac'], if_info['ip'], encode_macaddr('ff:ff:ff:ff:ff:ff'), encode_ipaddr(dest_ip))
    header = struct.pack('!6s6sH', encode_ipaddr(dest_ip), if_info['ip'], 0x0806)
    print(len(packet))
    sock.send(header + packet)
    data = sock.recvfrom(2048)
    print(data)
    time.sleep(3)
    sock.close()
    return data[0][48:76]

def format_data(data: bytes):
    print(len(data))
    print(data)
    print(struct.unpack('!HHBBH6s4s6s4s', data))

if __name__ == '__main__':
    data = arp_request('br0', '10.0.222.7')
    format_data(data)
