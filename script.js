var url = `https://api.tvmaze.com/shows`;
var main = document.querySelector("main");
var search = document.querySelector(".search-bar");
var body = document.querySelector("body");
var filmList = document.querySelector("ul");

window.addEventListener("load", getRequest);

function getRequest() {
  fetch(`https://api.tvmaze.com/shows`)
    .then((res) => res.json())
    .then((data) => createURL(data))
    .catch((err) => {
      console.log("ERROR");
    });
}

function createURL(obj) {
  console.log(obj);
  obj.sort(function (a, b) {
    return b.rating.average - a.rating.average;
  });

  var top50 = [];
  top50 = obj.filter(function (e, i, niz) {
    if (i < 50) {
      return e;
    }
  });

  top50.forEach(function (e) {
    var card = document.createElement("div");
    var img = document.createElement("img");
    var naslov = document.createElement("h4");
    var a = document.createElement("a");

    card.classList.add("card");
    img.setAttribute("src", e.image.medium);
    a.setAttribute("href", "./movie.html");
    a.setAttribute("target", "_blank");
    naslov.innerText = e.name;

    main.append(card);

    card.append(a);
    a.append(img, naslov);

    a.addEventListener("click", requestInfo);

    function requestInfo() {
      localStorage.setItem("naslov", e.name);
      localStorage.setItem("slika", e.image.original);
      localStorage.setItem("opis", e.summary);
      localStorage.setItem("id", e.id);
    }
  });
}

search.addEventListener("keyup", getResult);

function getResult() {
  fetch(`https://api.tvmaze.com/search/shows?q=${search.value}`)
    .then((res) => res.json())
    .then((data) => showMovies(data))
    .catch((err) => {
      console.log("ERROR");
    });
}

function showMovies(data) {
  console.log(data);
  filmList.innerHTML = "";

  data.forEach((e, i, niz) => {
    var film = document.createElement("li");
    var a = document.createElement("a");

    a.addEventListener("click", () => {
      localStorage.setItem("id", e.show.id);
    });
    a.setAttribute("href", "./movie.html");
    film.innerText = e.show.name;

    a.append(film);
    filmList.append(a);
  });

  if (search.value === "") {
    filmList.innerHTML = "";
  }
}
