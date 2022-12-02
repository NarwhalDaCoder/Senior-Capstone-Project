
//test function for sending over websockets-not ideal
export default function TestGetSocket(ip, port,mix,channel) {
    // Create WebSocket connection.
const socket = new WebSocket('ws://'+ip+':'+port);
//const socket = new WebSocket('ws://45.79.112.203:4242');
const prefix = 'get MIXER:Current/InCh/'
const infix = ['ToMix/On','ToMix/Pan','ToMix/Level','Label/Name']
let message = []
for (let i = 0; i < infix.length; i++) {
    let str = prefix + infix[i] + ' '+ mix + ' ' + channel
    console.log(str)
    message.push(str)
    } 
// Connection opened
socket.addEventListener('open', (event) => {
    socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', (event) => {
    console.log('Message from server ', event.data);
});
}