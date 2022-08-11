import struct

class Net:
    @staticmethod
    def bytes_to_string_ip(ipaddr: bytes) -> str:
        return '.'.join([str(octet) for octet in struct.unpack('!BBBB', ipaddr)])

    @staticmethod
    def bytes_to_string_mac(macaddr: bytes) -> str:
        return ':'.join([format(octet, 'x').rjust(2, '0') for octet in struct.unpack('!BBBBBB', macaddr)])

    @staticmethod
    def string_to_byte_ip(ipaddr: str) -> bytes:
        result = 0
        octets = ipaddr.split('.')
        for i in range(0, 4):
            result += int(octets[i]) << (len(octets) - i - 1) * 8
        return result.to_bytes(4, 'big')

    @staticmethod
    def string_to_byte_mac(ipaddr: str) -> bytes:
        result = 0
        octets = []
        if '-' in macaddr:
            octets = macaddr.split('-')
        elif ':' in macaddr:
            octets = macaddr.split(':')
        for i in range(0, 6):
            result += int(octets[i], 16) << (len(octets) - i - 1) * 8
        return result.to_bytes(6, 'big')

