var img = document.querySelector("img");
var naslov = document.querySelector("h1");
var p = document.querySelector("p");
var sezone = document.querySelector(".sezone");
var uloge = document.querySelector(".uloge");
var sezoneNaslov = document.querySelector(".seasons");

var niz = localStorage.getItem("premiere");


var a = new Array(niz);

a.forEach((e, i, arr) => {});

window.addEventListener("load", getSeasons);

function getSeasons() {
  fetch(`https://api.tvmaze.com/shows/${localStorage.getItem("id")}/seasons`)
    .then((res) => res.json())
    .then((data) => showSeasons(data))
    .catch((err) => {
      console.log("ERROR");
    });
  fetch(`https://api.tvmaze.com/shows/${localStorage.getItem("id")}/cast`)
    .then((res) => res.json())
    .then((data) => showCast(data))
    .catch((err) => {
      console.log("ERROR");
    });
  fetch(`https://api.tvmaze.com/shows/${localStorage.getItem("id")}`)
    .then((res) => res.json())
    .then((data) => showTVShowDetails(data))
    .catch((err) => {
      console.log("ERROR");
    });
}

function showTVShowDetails(show){
img.setAttribute("src", show.image.medium);
naslov.innerText = show.name;
p.innerHTML = show.summary
}

function showSeasons(obj) {
  console.log(obj);

  obj.forEach((e, i, niz) => {
    var li = document.createElement("li");

    li.innerText = e.premiereDate + " - " + e.endDate;
    sezoneNaslov.innerText = `Seasons(${niz.length})`;

    sezone.append(li);
  });
}

function showCast(obj) {
  obj.forEach((e, i, arr) => {
      if(i < 10){
          var li = document.createElement("li");
      
          li.innerText = e.person.name;
      
          uloge.append(li);
      }
  });
}
