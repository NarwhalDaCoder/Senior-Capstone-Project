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