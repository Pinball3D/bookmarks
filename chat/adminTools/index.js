var wss = new WebSocket("wss://52.70.17.111.sslip.io/");
const params = new URLSearchParams(window.location.search);
const username = "andrew"; //parseInt(params.get("user"))
const password = "minion2009"; //parseInt(params.get("user"))
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
