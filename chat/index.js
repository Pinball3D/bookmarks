var personlist = {}
var name = ""
var wss = new WebSocket("wss://18.205.105.185.sslip.io/");
document.querySelector("#msgbox").onkeydown = function(key) {
  if(key.key == "Enter") {
    wss.send(JSON.stringify({"action": "sendMessage", "message": document.querySelector("#msgbox").value, "sender": name}))
    document.querySelector("#msgbox").value="";
  }
}
wss.onopen = (event) => {
  name = prompt("Name: ");
  if(name.toLowerCase() == "rusa") {
    name = "Rusha Alluli"
  }
  wss.send(JSON.stringify({"action": "sendName", "name": name}))
}
wss.onmessage = (event) => {
  var data = JSON.parse(event.data);
  console.log(data);
  switch(data["sender"]) {
    case "SYSTEM":
      var ele = document.createElement("div")
      var elem = document.querySelector("#messages");
      ele.className = "message sysmessage"
      ele.innerHTML = data["message"];
      elem.appendChild(ele)
      elem.scrollTop = elem.scrollHeight;
      break;
    case "MEMBERS":
        Object.keys(personlist).forEach(i => {
          removePerson(i);
        });
      console.log(data["message"])
        data["message"].forEach(i => {
          console.log(i)
          addPerson(i);
        });
      break;
    default:
      var ele = document.createElement("div")
      if(data["type"] == "public") {
      var elem = document.querySelector("#messages");
      ele.className = "message"
      data["message"].split(" ").forEach(i => {
        if(i.includes("http://") || i.includes("https://")) {
          if(i.includes(".png")||i.includes(".jpg")||i.includes(".jpeg")||i.includes(".gif")||i.includes("data:image/")) {
            ele.innerHTML = data["sender"] + ": "
            var img = document.createElement("img");
            img.style="width: 250px; padding-left: 10px;";
            img.src = i;
            img.alt = i;
            elem.appendChild(ele)
            elem.appendChild(img)
          }
        } else {
          ele.innerHTML = data["sender"] + ": " + data["message"]
          elem.appendChild(ele)
        }
      })
      elem.scrollTop = elem.scrollHeight;
      } else {
        notifyPerson(data["sender"]);
        console.log("Private");
      }
      
      
  }
}
function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}
document.body.style.backgroundColor = choose(['#fc0303', '#fc7f03', '#fcf803', '#24fc03', '#03dffc', '#c203fc']);

function evalName(name) {
  if(Object.keys(personlist).includes(name)) {
    return false;
  } else {
    return true;
  }
}

function addPerson(name) {
  var div = document.createElement("div")
  div.innerHTML = name;
  div.className = "person";
  div.dataset.name = name;
  document.querySelector("#people").appendChild(div);
  personlist[name] = div
}
function removePerson(name) {
  personlist[name].remove();
}
function notifyPerson(name) {
  var circle = document.createElement("div");
  circle.style="transform: translate(-0%, -50%); position: absolute; top: 50%; right: 10px; background-color: red; border-radius: 50%; width: 15px; height: 15px;";
  document.querySelector("div[data-name='"+name+"']").appendChild(circle);
}
function unNotifyPerson(name) {
  document.querySelector("div[data-name='"+name+"']").innerHTML = name
}
