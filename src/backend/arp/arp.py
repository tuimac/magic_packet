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

    def 

    def _sendArp(self, ip: str):
        sock = socket.socket(socket.AF_PACKET, socket.SOCK_RAW, socket.htons(0x0003))
        sock.settimeout(5)        

    def scanAll(self):
        try:
            
        except TimeoutError:
            logger.error(traceback.format_exc())
            self.response['result'] = 'Timeout'
            return self.response
        except:
            logger.error(traceback.format_exc())
            self.response['result'] = 'Runtime error'
            return self.response

    def ping(self, ip: str):
        try:

        except TimeoutError:
            logger.error(traceback.format_exc())
            self.response['result'] = 'Timeout'
            return self.response
        except:
            logger.error(traceback.format_exc())
            self.response['result'] = 'Runtime error'
            return self.response
