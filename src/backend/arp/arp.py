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
        sock = socket.socket(socket.AF_PACKET, socket.SOCK_RAW, socket.htons(0x0003))
        sock.settimeout(5)
        sock.bind((interface, 0))

    def send(self, ip: str, interface: str) -> dict:
        try:
            if interface == '':
                interface = Net.
        except TimeoutError:
            logger.error(traceback.format_exc())
            self.response['result'] = 'Timeout'
            return self.response
        except:
            logger.error(traceback.format_exc())
            self.response['result'] = 'Runtime error'
            return self.response
