
//test function for sending over websockets-not ideal
export default function getDummyProfile(ip, port, mix, channel) {
  fetch('http://localhost:5000/getDummyProfile', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      channel: channel,
      mix: mix,
      HOST: ip,
      PORT: port
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
