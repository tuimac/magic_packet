#!/usr/bin/env python3

import socket
import struct

def encode_ipaddr(ipaddr):
    result = 0
    octets = ipaddr.split('.')
    for i in range(0, 4):
        result += int(octets[i]) << (len(octets) - i - 1) * 8
    return result

def arp_request(interface, src_ip, dest_ip, src_mac):
    # Create L2 socket
    sock = socket.socket(socket.AF_PACKET, socket.SOCK_RAW)
    sock.bind((interface, 0))
    
    # Create request datagram
    packet = struct.pack('!HHBBH')

if __name__ == '__main__':
    #arp_request('eth0')
    print(ipaddr_to_decimal('192.168.0.1'))
