import json
import logging
import traceback
import socket
import struct
import fcntl
from ..utils.net import Net

logger = logging.getLogger("django")

class Arp:
    def __init__(self):
        self.response = dict()
        self.sock = socket.socket(socket.AF_PACKET, socket.SOCK_RAW, socket.htons(0x0003))

    # Format the byte code data to dictionary
    def _format_recv_packet(packet: bytes):
        self.response['result'] = 'success'

        # Format the header
        dest_mac, src_mac, ether_type = struct.unpack('!6s6sH', packet[:14])
        self.response['header']['dest_mac'] = Net.bytes_to_string_mac(dest_mac)
        self.response['header']['src_mac'] = Net.bytes_to_string_mac(src_mac)
        self.response['header']['ether_type'] = str(ether_type)

        # Format the body
        ht, pt, hal, pal, op, src_mac, src_ip, dest_mac, dest_ip = struct.unpack('!HHBBH6s4s6s4s', packet[14:42])
        self.response['body']['ht'] = str(ht)
        self.response['body']['pt'] = str(hex(pt))
        self.response['body']['hal'] = str(hal)
        self.response['body']['op'] = str(op)
        self.response['body']['src_mac'] = Net.bytes_to_string_mac(src_mac)
        self.response['body']['src_ip'] = Net.bytes_to_string_ip(src_ip)
        self.response['body']['dest_mac'] = Net.bytes_to_string_mac(dest_mac)
        self.response['body']['dest_ip'] = Net.bytes_to_string_ip(dest_ip)
        return

    # Send single arp packet to the target server
    def send(self, dest_ip: str, interface=None, timeout=0.5) -> dict:
        try:
            # If Network interface name is not difined, get the default network interface name. 
            if interface is None:
                interface = Net.get_default_ifname()
                
            # Initial parameters
            src_mac = Net.get_mac_from_if(interface)
            src_ip = Net.get_ip_from_if(interface)['ip']

            # Create the arp packet
            header = struct.pack('!6s6sH',
                b'\xff\xff\xff\xff\xff\xff',
                src_mac,
                0x0806
            )
            packet = struct.pack('!HHBBH6s4s6s4s',
                0x0001,
                0x0800,
                0x06,
                0x04,
                0x0001,
                src_mac,
                src_ip,
                b'\xff\xff\xff\xff\xff\xff',
                dest_ip
            )

            # Send Arp packet
            self.sock.settimeout(timeout)
            self.sock.bind((interface, 0))
            self.sock.send(header + packet)
            self._format_recv_packet()
            return self.response
        except TimeoutError:
            logger.error(traceback.format_exc())
            self.response['result'] = 'Timeout'
            return self.response
        except:
            logger.error(traceback.format_exc())
            self.response['result'] = 'Runtime error'
            return self.response
