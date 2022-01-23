//Bookmark Generation
$.getJSON('https://pinball3d.github.io/storage/bookmark-code/registry.json', function(data){
  console.log(data);
  var code = "";
  var i = 0;
  console.log(data.length, i < data.length)
  while (i < data.length) {
    var url = "https://pinball3d.github.io/storage/bookmark-code/"+data[i].code;
    console.log(url)
    var a = document.createElement("a");
    var base = "var script = document.createElement('script'); script.src = '"+url+"'; document.body.appendChild(script)";
    console.log(base)
    var code = "javascript: "+encodeURIComponent("(function(){" + base.trim() +  "})();");
    a.href = code;
    a.innerHTML = data[i].name;
    a.id="on"
document.getElementById(data[i].catg).appendChild(a);
    i++;
  }
});




//Switch Tabs
var color = "#292828";
var selcolor = "#4a4646";
var selected = "";
var m = document.getElementById("main");
var main = document.getElementById("content");
var back = document.getElementById("backgrounds");
var cursors = document.getElementById("cursors");
var sounds = document.getElementById("sounds");
var misc = document.getElementById("misc");
var msg = document.getElementById("msg");
var iconhouse = document.getElementById("house");
var iconback = document.getElementById("bg");
var iconcursor = document.getElementById("cur");
var iconsound = document.getElementById("soun");
var iconmisc = document.getElementById("mis");
var message = "Welcome to the new bookmarks page!";
var base = "?page=";

function home() {
  selected = "#house";
  iconhouse.style.backgroundColor=selcolor;
  iconback.style.backgroundColor=color;
  iconcursor.style.backgroundColor=color;
  iconsound.style.backgroundColor=color;
  iconmisc.style.backgroundColor=color;
  msg.textContent = message;
  main.hidden = false;
  back.hidden = true;
  cursors.hidden = true;
  sounds.hidden = true;
  misc.hidden= true;
  window.location.href=base+"";
}
function background() {
  selected="#bg";
  iconback.style.backgroundColor=selcolor;
  iconhouse.style.backgroundColor=color;
  iconcursor.style.backgroundColor=color;
  iconsound.style.backgroundColor=color;
  iconmisc.style.backgroundColor=color;
  main.hidden = true;
  msg.textContent = "Backgrounds";
  back.hidden = false;
  cursors.hidden = true;
  sounds.hidden = true;
  misc.hidden= true;
  window.location.href=base+"backgrounds";
}
function cursor() {
  selected="#cur";
  iconcursor.style.backgroundColor=selcolor;
  iconback.style.backgroundColor=color;
  iconhouse.style.backgroundColor=color;
  iconsound.style.backgroundColor=color;
  iconmisc.style.backgroundColor=color;
  main.hidden = true;
  msg.textContent = "Cursors";
  back.hidden = true;
  cursors.hidden = false;
  sounds.hidden = true;
  misc.hidden= true;
  window.location.href=base+"cursors";
}
function sound() {
  selected="#soun";
  iconsound.style.backgroundColor=selcolor;
  iconback.style.backgroundColor=color;
  iconcursor.style.backgroundColor=color;
  iconhouse.style.backgroundColor=color;
  iconmisc.style.backgroundColor=color;
  main.hidden = true;
  msg.textContent = "Sounds";
  back.hidden = true;
  cursors.hidden = true;
  sounds.hidden = false;
  misc.hidden= true;
  window.location.href=base+"sounds";
}
function miscc() {
  selected="#mis";
  iconmisc.style.backgroundColor=selcolor;
  iconback.style.backgroundColor=color;
  iconcursor.style.backgroundColor=color;
  iconsound.style.backgroundColor=color;
  iconhouse.style.backgroundColor=color;
  main.hidden = true;
  msg.textContent = "Miscellaneous";
  back.hidden = true;
  cursors.hidden = true;
  sounds.hidden = true;
  misc.hidden= false;
  window.location.href=base+"misc";
}


//Light mode/darkmode

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function lightmode() {
  color="#d6d7d7";
  selcolor="#b5b9b9";
  main.style.backgroundColor = "#d1d3d3";
  document.getElementById("nav-bar").style.backgroundColor="#ededed";
  msg.style.backgroundColor="#ededed";
  msg.style.color="black";
  document.getElementById("text").style.color="black";
  m.style.backgroundColor="#d1d3d3";
  $(".side").css("background-color", color);
  $(selected).css("background-color", selcolor);
  $(".mode").text("Light Mode");
  $("#content").css("color", "black");
}
function darkmode(){
  color="#292828";
  selcolor="#4a4646";
  main.style.backgroundColor = "#2e2c2c";
  document.getElementById("nav-bar").style.backgroundColor="#121212";
  msg.style.backgroundColor="#121212";
  msg.style.color="white";
  document.getElementById("text").style.color="white";
  m.style.backgroundColor="#2e2c2c";
  $(".side").css("background-color", color);
  $(selected).css("background-color", selcolor);
  $(".mode").text("Dark Mode");
  $("#content").css("color", "white");
}
var box = document.getElementById("check")

function check() {
  lightmode();
  document.cookie = "mode=light;";
}
function uncheck() {
  darkmode();
  document.cookie = "mode=dark;";
}
$("#check").change(function() {
    if(this.checked) {
        check();
    } else {
      uncheck();
    }
});
if (getCookie("mode")=="") {
  uncheck();
  document.cookie = "mode=dark;";
  box.checked=false;
}
if (getCookie("mode") == "dark") {
  uncheck();
  box.checked=false;
} else {
  check();
  box.checked=true;
}
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
var value = getParameterByName("page");
if(value == "backgrounds") {
  background();
} else if(value == "cursors") {
  cursor();
} else if(value == "sounds") {
  sound();
} else if(value == "misc") {
  miscc();
} else {
  home();
}
