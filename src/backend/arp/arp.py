import json
import logging
import traceback
import socket
import struct
import fcntl

logger = logging.getLogger("django")

class Arp:
    def __init__(self):
        self.response = dict()
        sock = socket.socket(socket.AF_PACKET, socket.SOCK_RAW, socket.htons(0x0003))
        sock.settimeout(5)
        sock.bind((interface, 0))

    def _sendArp(self, ip: str):

    def scanAll(self) -> dict:
        try:
            
        except TimeoutError:
            logger.error(traceback.format_exc())
            self.response['result'] = 'Timeout'
            return self.response
        except:
            logger.error(traceback.format_exc())
            self.response['result'] = 'Runtime error'
            return self.response

    def ping(self, ip: str) -> dict:
        try:

        except TimeoutError:
            logger.error(traceback.format_exc())
            self.response['result'] = 'Timeout'
            return self.response
        except:
            logger.error(traceback.format_exc())
            self.response['result'] = 'Runtime error'
            return self.response
