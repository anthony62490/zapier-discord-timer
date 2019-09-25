// donut steel
const webhook = {
    id: "625905486289567754",
    token: "CSVgNzwdsl4ARWQ9Eofv-e3o82UoJyXJr8rY8tNFdK1jmx3xkBFoTb7A796zs8U9VBZx"
  }

function getTimeUntil(d1, d2) {
  const dateNow = d1.getTime();
  const dateTarget = d2.getTime();
  let totalSeconds = Math.floor((dateTarget - dateNow)/1000);
  const days = Math.floor(totalSeconds/(24*3600));
  totalSeconds -= (days*24*3600);
  const hours = Math.floor(totalSeconds/(3600));
  totalSeconds -= (hours*3600);
  const minutes = Math.floor(totalSeconds/(60));
  const seconds = totalSeconds - (minutes*60);
  return { days, hours, minutes, seconds };
}

const now = new Date();
const then = new Date("2019-10-01T00:00:00Z");

const timeTillDoom = getTimeUntil(now,then);

const body = {
    username: "Space Clock",
    avatar_url: "https://i.imgur.com/CrNRMan.png",
    content: `COUNTDOWN TO SPACE!\n${timeTillDoom.days} days, ${timeTillDoom.hours} hours, ${timeTillDoom.minutes} minutes, ${timeTillDoom.seconds} seconds`
  }
  const options = {
    method:"POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  }

  const res = await fetch(`https://discordapp.com/api/webhooks/${webhook.id}/${webhook.token}`, options)

return {res};