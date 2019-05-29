const dgram = require('dgram');
const parserUDP = require('./parserUDP');
const udpServer = dgram.createSocket('udp4');
const config = require('config');
const udpBind = config.get('udpBind');

const connectUDP = async () => {
  try {
    // Error Message
    await udpServer.on('error', err => {
      console.log(`UDP server error:\n${err.stack}`);
      udpServer.close();
    });

    // Server receives package message
    await udpServer.on('message', (msg, rinfo) => {
      parserUDP(msg.toString('utf8'));
      // console.log(`UDP server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    });

    // UDP server announces which address and port is listening
    await udpServer.on('listening', () => {
      const address = udpServer.address();
      console.log(`UDP server listening ${address.address}:${address.port}`);
    });

    await udpServer.bind(udpBind);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectUDP;
// Prints: server listening 0.0.0.0:51235
