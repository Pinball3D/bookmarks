var personlist = {};
var name = "";
var privateMessages = {};
var wss = new WebSocket("wss://18.205.105.185.sslip.io/");
document.querySelector("#msgbox").onkeydown = function(key) {
  if(key.key == "Enter") {
    wss.send(JSON.stringify({"action": "sendMessage", "message": document.querySelector("#msgbox").value, "sender": name}))
    document.querySelector("#msgbox").value="";
  }
}
function getName(p) {
  name = prompt(p);
  if(name.toLowerCase() == "rusa") {
    name = "Rusha Alluli"
  }
  if(name.split("").length > 13) {
    name = getName("Please Pick a Name under 13 characters.")
  } else {
    return name;
  }
}
wss.onopen = (event) => {
  wss.send(JSON.stringify({"action": "sendName", "name": getName("Name: ")}))
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
        privateMessages[data["sender"]].appendChild(data["sender"]+": "+data["message"])
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
  privateMessages[name] = [];
  var div = document.createElement("div")
  div.innerHTML = name;
  div.className = "person";
  div.dataset.name = name;
  div.addEventListener("click", privateClick);
  document.querySelector("#people").appendChild(div);
  personlist[name] = div;
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
function privateClick(event) {
  console.log(event.target.dataset.name);
  var div = document.createElement("div")
  div.className = "privateMSG";
  div.innerHTML = "<div id='title' style='width: 100%; left: 0%;'>Private Message: "+event.target.dataset.name+"</div><div id='messages' style='left: 0%; width: 100%;'></div><input id='msgbox' style='left: 0%; width: 100%' data-name='"+event.target.dataset.name+"' placeholder='Send a message...'></input>";
  document.querySelector("#main").style.filter = "blur(10px)";
  document.body.appendChild(div);
}
