/*
This function will call the Flask api at getDummyProfile by sending a json and recieving 
a json back as a response. The JSON file will then be saved to the device and returned
to the caller.
*/
export default async function getDummyProfile(ip, port, mix, channel) {
  try {
    const response = await fetch('http://localhost:5000/getDummyProfile', {
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
    });
    
    const data = await response.json();

    // create a new blob with the JSON data
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });

    // create a new URL object to reference the blob
    const url = URL.createObjectURL(blob);

    // create a new FileReader object to read the blob as text
    const reader = new FileReader();

    reader.readAsText(blob);

    reader.onload = function() {
      // save the JSON data to a file
      const link = document.createElement('a');
      link.href = url;
      link.download = 'data.json';
      link.click();
    };
    
    //return data to caller
    return data;
  } catch (err) {
    console.log(err);
  }
}