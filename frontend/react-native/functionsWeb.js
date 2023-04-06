/*
This function will take expects the response of a JSON file after being parsed with .json()
This will create a link that will wbe autoclicked for users to download the configuration file.
*/
async function saveData(data) {

  try{
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
async function getConfigProfile(ip, port, mix, channel,isDummy) {
let path = '';
try {
    const dummyPath = 'http://localhost:5000/getDummyProfile'
    const yamahaPath = 'http://localhost:5000/getYamahaProfile'
    if (isDummy == true) {
        path = dummyPath;
      }
    else{
        path = yamahaPath;
    }
    const response = await fetch(path, {
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
    
    const tempData = await response.json();
    const data = saveData(tempData);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export { getConfigProfile };