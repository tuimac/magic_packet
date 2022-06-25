import json
import logging
import traceback
import socket
import struct

logger = logging.getLogger("django")

class SendPacket:
    def __init__(self):
        self.response = dict()    

    def sendpacket(self, macaddr):
        try:
            # Magic Packet
            packet = b'\xff' * 6 + struct.pack('BBBBBB', *([int(octet, 16) for octet in macaddr.split(':')]))

            # Send Magic Packet
            sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            sock.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
            sock.sendto(packet, ('255.255.255.255', 7))
            self.response['result'] = 'success'
            return self.response
        except:
            logger.error(traceback.format_exc())
            self.response['result'] = 'Runtime error'
            return self.response
