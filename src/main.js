import './style.css'

const gloves = await (await fetch('/cgloves-web/gloves.json')).json()

document.querySelector('#app').innerHTML = `
<div class="header">
  <h1>Glove Checker</h1>
</div>
<div class="cgloves-parameters">
  <input id="roblox-username" placeholder="Roblox username">
  <button id="check-button">Check</button>
  <select id="proxy-select">
    <option selected value="https://subdomain.roblox.com">No proxy</option>
    <option value="https://subdomain.roproxy.com">RoProxy</option>
    <option value="https://subdomain.rotunnel.com">RoTunnel</option>
    <option value="https://corsproxy.io/?url=https://subdomain.roblox.com">corsproxy.io</option>
  </select>
</div>
<table id="results">
  <tr>
    <th>Glove</th>
    <th>Status</th>
  </tr>
</table>
`
const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            return await response.json()
        } catch (error) {
            if (i < retries - 1) {
                console.log(`Retrying... (${i + 1})`)
                await new Promise(res => setTimeout(res, delay))
            } else {
                throw error
            }
        }
    }
};

document.querySelector("#check-button").addEventListener("click", async e => {
  document.querySelector("#results").innerHTML = `
  <tr>
    <th>Glove</th>
    <th>Status</th>
  </tr>`
  const username = document.querySelector("#roblox-username").value
  let userId
  let res
  const proxyUrl = document.querySelector("#proxy-select").value
  try {
    res = await fetch(`${proxyUrl.replace("subdomain", "users")}/v1/usernames/users`, {
      body: JSON.stringify({
        "usernames": [
          username
        ],
        "excludeBannedUsers": true
      }
      ),
      method: "POST"
    })
  } catch (e) {
    if (proxyUrl === "https://subdomain.roblox.com") {
      document.querySelector("#results").innerHTML=`
      <div>You need to install an extension to allow your browser to send requests to roblox.</div>
      <a href="https://chromewebstore.google.com/detail/lfhmikememgdcahcdlaciloancbhjino">Chrome</a>
      <a href="https://addons.mozilla.org/en-US/firefox/addon/cors-unblock/">Firefox</a>
      <div>Or you can select one of the available proxies.</div>
      `
    }
  }
  if (res.status === 429) {
    alert("Rate limited. Try again later or select a different proxy.")
    return
  } else if (!res.ok) {
    alert("Something went wrong. Try again later or select a different proxy")
  }
  const data = await res.json()
  try {
    userId = data.data[0].id
  } catch (e) {
    alert("Couldn't find the user")
    return
  }
  let iterations = 0
  for (const entry of Object.entries(gloves)) {
    document.querySelector("#results").innerHTML+=`
    <tr>
     <td>${entry[1]}</td> 
     <td id="id${entry[0]}">Loading...</td>
    </tr>`
    setTimeout(async () => {
      const cell = document.querySelector(`#id${entry[0]}`)
      let result
      try {
        result = await fetchWithRetry(`${proxyUrl.replace("subdomain", "inventory")}/v1/users/${userId}/items/2/${entry[0]}/is-owned`)
      } catch (e) {
        cell.textContent = "Error"
      }
      if (result === true) {
        cell.textContent = "Owned"
        cell.style.color = '#00ff00'
      } else if (result === false) {
        cell.textContent = "Not owned"
        cell.style.color = '#990000'
      } else {
        cell.textContent = "Error"
      }
    }, 1000*iterations)
    iterations += 1
  }
})
