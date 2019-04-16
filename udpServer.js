const dgram = require('dgram')
const parserUDP = require('./parserUDP')
const udpServer = dgram.createSocket('udp4')

// Error Message
udpServer.on('error', (err) => {
    console.log(`UDP server error:\n${err.stack}`)
    udpServer.close();
})

// Server receives package message
udpServer.on('message', (msg, rinfo) => {
    parserUDP(msg.toString('utf8'))
    // console.log(`UDP server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
})

// UDP server announces which address and port is listening
udpServer.on('listening', () => {
    const address = udpServer.address();
    console.log(`UDP server listening ${address.address}:${address.port}`);
})

udpServer.bind(51235)

module.exports = udpServer;
// Prints: server listening 0.0.0.0:51235


