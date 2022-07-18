import struct

class Net:
    def __init__(self):
        pass

    def bytes_to_string_ip(self, ipaddr: bytes) -> str:
        return '.'.join([str(octet) for octet in struct.unpack('!BBBB', ipaddr)])

    def bytes_to_string_mac(self, macaddr: bytes) -> str:
        return ':'.join([format(octet, 'x').rjust(2, '0') for octet in struct.unpack('!BBBBBB', macaddr)])
