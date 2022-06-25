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
            reply = sock.recv(512)

            # Extract packet data from echo reply
            msg_type, msg_code, msg_checksum, msg_id, msg_seq_num = struct.unpack('!BBhHH', reply[20:28])
            self.response['packet'] = dict()
            self.response['packet']['type'] = msg_type
            self.response['packet']['code'] = msg_code
            self.response['packet']['checksum'] = msg_checksum
            self.response['packet']['id'] = msg_id
            self.response['packet']['sequence_number'] = msg_seq_num

            self.response['result'] = 'success'
            return self.response
        except TimeoutError:
            logger.error(traceback.format_exc())
            self.response['result'] = 'Timeout'
            return self.response
        except:
            logger.error(traceback.format_exc())
            self.response['result'] = 'Runtime error'
            return self.response
