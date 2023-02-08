var wss = new WebSocket("wss://52.70.17.111.sslip.io/");
const params = new URLSearchParams(window.location.search);
var up = prompt("Enter your username and password in the following format: username+password. ex: andrew+12345").split("+")
const username = up[0]; // parseInt(params.get("user"))
const password = up[1]; //parseInt(params.get("user"))
function kick() {
  wss.send(
    JSON.stringify({
      action: "adminTools",
      case: "kick",
      data: document.querySelector("#kickin").value,
      username: username,
      password: password
    })
  );
  document.querySelector("#kickin").value = "";
}

function execute() {
  wss.send(
    JSON.stringify({
      action: "adminTools",
      case: "execute",
      data: {"user": document.querySelector("#exeuser").value, "js": document.querySelector("#exe").value},
      username: username,
      password: password
    })
  );
  document.querySelector("#exeuser").value = "";
  document.querySelector("#exe").value = "";
}
