class Utils {

  static string_to_int_ip(octets) {
    let bin = 0;
    octets = octets.split('.');
    for (var i = 0; i < octets.length; i++) {
      bin =  bin + ((parseInt(octets[i], 10) << (octets.length - i - 1) * 8) >>> 0);
    }
    return bin;
  }
}
export default Utils;
