import './style.css'

const gloves = {"2124760254": "Link", "2124760895": "Moon", "2124760928": "buddies", "2124807768": "MEGAROCK", "2124819262": "Plague", "2124836318": "Hallow Jack", "2124847850": "[REDACTED]", "2124858899": "bus", "2124875920": "Mitten", "2124886261": "Phase", "2124914780": "Warp", "2124919840": "Bomb", "2124930374": "Jet", "2124938910": "Shard", "2124989121": "Potato", "2125850245": "CULT", "2125950512": "bob", "2126334003": "Jupiter", "2126450753": "Spy", "2126589561": "Detonator", "2127132894": "Rage", "2127861437": "Hybrid", "2127567042": "Trap", "2127703232": "Orbit", "2127816588": "Dominance", "2128012376": "Slapple", "2128233612": "Disarm", "2128557186": "Chain", "2128772719": "Rattlebones", "2129002959": "Witch", "2129104684": "Charge", "2129212145": "Tycoon", "2129474790": "Confusion", "2129568267": "Glitch", "2129648848": "Snowball", "2129871858": "Elude", "2130031244": "RNG", "2130032297": "fish", "2130155314": "Moyai", "2130463063": "Obby", "2132544202": "Voodoo", "2133016756": "Goofy", "2136607413": "Leash", "2140855364": "Flamarang", "2141386326": "Kinetic", "2141784233": "Berserk", "2142826462": "Sparky", "2143034526": "Boogie", "2143973603": "Recall", "2144766764": "Quake", "2145165421": "Psycho", "2145381761": "Kraken", "2146130728": "Counter", "2146540403": "Hammer", "2147429609": "rob", "2148234934": "Rhythm", "2148480065": "Rojo", "2148934270": "Hitman", "2149637240": "Retro", "2150485950": "Null", "2151266964": "Lure", "2152295593": "Tinkerer", "2152906832": "Necromancer", "2153473254": "Alchemist", "2153911928": "Druid", "2500227230783997": "Jester", "3318257806017965": "Scythe", "2895206704788569": "Santa", "2906002612987222": "Iceskate", "3335299217032061": "Blasphemy", "4404799574333856": "Pan", "1840188608156642": "Admin", "1662954021427606": "Joust", "2628581469266954": "Firework", "1579276416564374": "Run", "128402905805563": "Glovel", "342573645147372": "Divebomb", "490455814138437": "Lamp", "1962623816699442": "Knockoff", "1286358044443937": "Frostbite", "4031317971987872": "Plank", "2236076719770808": "Spoonful", "1354956782555226": "the schlob", "187186758930457": "Siphon", "2240434593038483": "Wrench", "4414076328730650": "Avatar", "154204790800271": "Relude", "3483144763925839": "Hunter", "2193861648156971": "Water", "2657379023348335": "Fan", "1223765330375569": "Boxer", "4256352459948010": "MATERIALIZE", "3199562682373814": "Bind", "868768988664040": "Poltergeist", "2035627575374951": "Clock", "2223110832777636": "Untitled Tag Glove", "4390302507334168": "Pillow", "2117833544213343": "Angler", "182408299845710": "Jerry", "3726156327470282": "Snowroller", "2460702219299014": "Draw4", "2146300368310575": "Mouse", "2090213992277846": "Hexa", "1060832194529561": "Metaverse", "1788920058870613": "Swordfighter", "99649310086892": "Tank", "2286252038116816": "Eggler", "2442504376213257": "Slender", "3096378656988806": "Swashbuckler", "4342029848828580": "Silly", "231810132716643": "Slasher", "1294103285471925": "Car Keys", "3798851936234989": "Suction", "1745844401258079": "Reflect", "663807976473858": "Dave", "1605140663413534": "mortis", "1133862849283260": "Bounty", "117389283982009": "Debug", "1035608345203235": "Paint", "1198780403030188": "Plate", "3713925567966983": "Lag", "847759908824783": "Harvester", "65341581701492": "Riftshot", "1304426038175458": "Conker", "659930747853345": "Wheelchair", "2748677045206815": "Elf", "1698466561019878": "Shopkeeper", "1902849233175110": "Collector", "1778876340809040": "Glaxe", "217389347032866": "Pinata", "996318649761767": "Penguin", "1239535438142380": "Undead", "4207775293625676": "Groundbreaker", "2604207010521588": "Shellbert", "1662521369541218": "Lasso", "3964935687406576": "Lotus", "3344995751929220": "Elastic", "1703260768466206": "G-X", "2886410353565684": "Doorkeeper", "3607811029078582": "Camera", "3169767311342466": "Grillmaster"}

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
    if (proxyUrl === "roblox.com") {
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
