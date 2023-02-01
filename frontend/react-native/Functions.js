
//test function for sending over websockets-not ideal
export default function TestGetSocket(ip, port,mix,channel,command) {
fetch('http://localhost:5000/getstatus', {
  method: 'POST',
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    channel:channel,
    mix:mix,
    command:command,
    HOST:ip,
    PORT:port
  })
})
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
}