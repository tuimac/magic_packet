import json
import logging
import traceback
import socket
import struct

logger = logging.getLogger("django")

class Ping:
    def __init__(self):
        self.response = dict()

    def sendpacket(self, ip):
        try:
            # Generate checksum
            header = struct.pack('!BBHHH', 8, 0, 0, 1, 1)
            checksum = int.from_bytes(header, 'big')
            while checksum > 0xffff:
                checksum = (checksum & 0xffff) + (checksum >> 16)
            checksum = ~checksum

            # Create packet
            packet = struct.pack('!BBhHH', 8, 0, checksum, 1, 1)

            # Send ICMP packet
            sock = socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_ICMP)
            sock.settimeout(10)
            sock.sendto(packet, (ip, 0))
            res = sock.recv(512)
            self.response['result'] = res
        except TimeoutError:
            logger.error(traceback.format_exc())
            self.response['result'] = 'Timeout'
            return self.response
        except:
            logger.error(traceback.format_exc())
            self.response['result'] = 'Runtime error'
            return self.response
