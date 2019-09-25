const webhook = {
  id: "",
  token: ""
};
const earlyCutoff = 9; //9
const lateCutoff = 22; //22
const frequency = 3 //3
//locale time
const now = new Date(new Date().toUTCString());
// UTC time
const then = new Date("2019-10-01T00:00:00Z");
// Convert current UTC hour to CST (0-23)
const currentHour = now.getHours()-5 > 0 ? now.getHours()-5 : now.getHours()+19;

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
};

//get time
const timeLeft = getTimeUntil(now,then);

const debug = {
  earlyCutoff,
  lateCutoff,
  now,
  then,
  currentHour,
  timeLeft
};

let alert = false;

//logic to make alert less frequent
if (currentHour > earlyCutoff && currentHour < lateCutoff) {
  if (timeLeft.days > 0) {
    if (timeLeft.hours % frequency === 0) {
      alert = true;
    } else {
      return {text: "Did not alert. Off hour", ...debug};
    };
  } else if (timeLeft.days === 0) {
    alert = true;
  } else {
    return {text: "Did not alert. Timer expired", ...debug};
  };
} else {
  return {text: "Did not alert. Outside reasonable time range", ...debug};
};

if(alert) {
  const party = ["Arthur", "JiKo", "Kokūzō", "Lita", "Marcus", "everyone", "the whole crew"];
  const person = party[Math.floor(Math.random()*party.length)];
  const phrase = [
    "Hey guys... GUYS! The space is coming! Be ready for it!",
    `Just a bit longer until ${person} dies! Yaaaay! \\o/`,
    "Just a little bit longer. Almost time for space.",
    "The maiden voyage of the Gift Horse is only THIS far off!",
    "Tonight's the night! Let's show this universe who's BOSS!",
    "Someone warmed up the warp drive, right? We're gonna need that",
    "Can't wait for space!",
    "It's never too late to be a space punk band! We can do it!",
    "Make sure you go potty, kids! We're not turning this ship around!",
    "Buy NERPs!",
    `Just a little while until ${person} dies in space! Woooo! \\o/`,
    "Who's ready for space adventure?!",
    "Almost time for space!",
    "I'm gonna take enough space drugs to taste god!",
    "On second thought guys, we should seriously swap out for the Patrol Boat hull.",
    `How long do you think before we need to shove ${person} out an airlock? I give us three days, tops.`,
    "On tonight's episode of Stars Without Number, the party buys enough guns to punch a hole in time. Don't miss it!",
    "Who's ready to get murdered by techno monks? I know I am!",
    "If anyone here tries to start a burgeoning shoe empire, you're going out the garbage chute.",
    "Almost time to find out how many arms we can bolt on to the robot!"
  ];
  const randPhrase = `${phrase[Math.floor(Math.random()*phrase.length)]}`;
  const content = 
    (timeLeft.days > 0 || timeLeft.hours >= 20) ? `COUNTDOWN TO SPACE!\n${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds` :
    (timeLeft.days === 0 && timeLeft.hours < 20 && timeLeft.hours > 0) ? `${randPhrase}\n${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds` :
    (timeLeft.days === 0 && timeLeft.hours === 0) ? "@everyone HOLY SHIT! HEY GUYS! IT'S TIME FOR COOL SPACE! GET YOUR ASSES IN HERE!" :
    `Something has gone horribly wrong. I don't know what it is. ${JSON.stringify(debug)}`;
  const body = {
    username: "Space Clock",
    avatar_url: "https://i.imgur.com/CrNRMan.png",
    content
  };
  const options = {
    method:"POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  };

  //make request
  const res = await fetch(`https://discordapp.com/api/webhooks/${webhook.id}/${webhook.token}`, options);
  return {res};
} else {
  return {text: "Did not alert. Alert bool not set", ...debug};
};