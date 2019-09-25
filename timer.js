const webhook = {
    id: "625905486289567754",
    token: "CSVgNzwdsl4ARWQ9Eofv-e3o82UoJyXJr8rY8tNFdK1jmx3xkBFoTb7A796zs8U9VBZx"
  }

var DateDiff = {
    inDays: function(d1, d2) {
        var t1 = d1.getTime();
        var t2 = d2.getTime();
        return parseInt((t1-t2)/(24*3600*1000));
    },
    inHours: function(d1, d2) {
        var h1 = d1.getTime();
        var h2 = d2.getTime();
        const dayInHours = 24*parseInt((h1-h2)/(24*3600*1000));
        return parseInt(((h1-h2)/(1000*3600))-dayInHours);
    },
    inMinutes: function(d1, d2) {
        var m1 = d1.getTime();
        var m2 = d2.getTime();
        const dayInHours = 24*parseInt((m1-m2)/(24*3600*1000));
        const dayInMinutes = 24*60*parseInt((m1-m2)/(24*3600*1000));
        const hourInMinutes = 60*parseInt(((m1-m2)/(1000*3600))-dayInHours);
        return parseInt(((m1-m2)/(60*1000))-dayInMinutes-hourInMinutes);
    },
    inSeconds: function(d1, d2) {
        var s1 = d1.getTime();
        var s2 = d2.getTime();
        const dayInHours = 24*parseInt((s1-s2)/(24*3600*1000));
        const dayInMinutes = 24*60*parseInt((s1-s2)/(24*3600*1000));
        const dayInSeconds = 24*60*60*parseInt((s1-s2)/(24*3600*1000));
        const hourInMinutes = 60*parseInt(((s1-s2)/(1000*3600))-dayInHours);
        const hourInSeconds = 60*60*parseInt(((s1-s2)/(1000*3600))-dayInHours);
        const minuteInSeconds = 60*parseInt(((s1-s2)/(60*1000))-dayInMinutes-hourInMinutes)
        return parseInt(((s1-s2)/1000)-dayInSeconds-hourInSeconds-minuteInSeconds);
    }
}

var d1 = new Date("2019-10-01T00:00:00Z");
var d2 = new Date();

const timeTillDoom = {
  days: DateDiff.inDays(d1, d2),
  hours: DateDiff.inHours(d1, d2),
  minutes: DateDiff.inMinutes(d1, d2),
  seconds: DateDiff.inSeconds(d1, d2)
};

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