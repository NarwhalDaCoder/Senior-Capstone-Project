
//test function for sending over websockets-not ideal
export default function TestGetSocket(ip, port,mix,channel,command) {
let formdata = new FormData();

formdata.append("channel", channel)
formdata.append("mix", mix)
formdata.append("command", command)
formdata.append("PORT", port)
formdata.append("HOST", ip)
fetch('http://localhost:5000/getstatus', {
  method: 'POST',
  headers: {
     'Content-Type': 'multipart/form-data',
  },
  body: formdata
  }).then(response => {
    console.log(response)
  }).catch(err => {
    console.log(err)
  })  
}