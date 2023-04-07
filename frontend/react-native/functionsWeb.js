async function getConfigProfile(ip, port, mix, channel) {

try {
    var hostname = window.location.hostname;
    const path = 'http://'+hostname+'/getConfigProfile'
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