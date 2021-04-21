// Queryselectors
var charIMG = document.querySelector("#charimg");
var searchBox = document.querySelector("#search");
var bioBox = document.querySelector("#bio");
var mediaBox = document.querySelector("#media");
var comicsBox = document.querySelector("#comics");
var pageTitle = document.querySelector("#character-title");
      

function getParams() {
    var searchParameters = document.location.search.split('&');

    var query = searchParameters[0].split('=').pop();

    getMarvelApi(query);
    getOMDBApi(query);
}

function getMarvelApi (heroInput) {
    let apikey = "8dc274afb84abf0f19f28c01d6ac7425";
    let requestUrl = "https://gateway.marvel.com:443/v1/public/characters?name=" + heroInput + "&orderBy=name&apikey=" + apikey + "&ts=1&hash=6262a02cba8e28cbd51f531c1e20a49f";

    
    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
      console.log(data);
      console.log(data.data.results[0].description);

      document.title = "Dare DEVils: " + data.data.results[0].name;
      pageTitle.textContent = data.data.results[0].name;
      
      var img = document.createElement('img');
      img.src = data.data.results[0].thumbnail.path + '/landscape_amazing.jpg';
      charIMG.appendChild(img);

      var disclaimer = document.createElement("h5");
      disclaimer.textContent = "Biography";
      bioBox.appendChild(disclaimer)
      
      var biograpghy = document.createElement('p');
      if(data.data.results[0].description != "") {
        biograpghy.innerHTML = data.data.results[0].description + "<br><a href=\"" + data.data.results[0].urls[1].url + "\">Read More<a>";
      }
      else {
        biograpghy.innerHTML = "This character is missing a description from the Marvel API. However, you can still read more about them here: <a href=\"" + data.data.results[0].urls[1].url + "\">Read More<a>";
      }
      bioBox.appendChild(biograpghy);
    })

    let requestComicUrl = "https://gateway.marvel.com:443/v1/public/comics?title=" + heroInput + "&orderBy=title&apikey=" + apikey + "&ts=1&hash=6262a02cba8e28cbd51f531c1e20a49f";

    fetch(requestComicUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        console.log(data.data.results[0].thumbnail);
        
        var disclaimer = document.createElement("h5");
        disclaimer.textContent = "Comics";
        comicsBox.appendChild(disclaimer)

        var ComicImg;

        for(var i = 0; i < data.data.results.length; ++i) {
            if(data.data.results[i].thumbnail.path != "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available") {
                ComicImg = document.createElement('img');
                ComicImg.src = data.data.results[i].thumbnail.path + "/portrait_incredible.jpg";
                comicsBox.appendChild(ComicImg);
            }
        }
    })

}

function getOMDBApi (heroInput) {
    let OMDBkey = "9bb482ed"
    let requestOMDBUrl = "http://www.omdbapi.com/?t=" + heroInput + "&type=movie&apikey=" + OMDBkey;

    fetch(requestOMDBUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        console.log(data.Title);
        
        var disclaimer = document.createElement("h5");
        disclaimer.textContent = "First Titular Film";
        mediaBox.appendChild(disclaimer)

        var moviePoster = document.createElement("img");
        moviePoster.src = data.Poster;
        mediaBox.appendChild(moviePoster);

        var movieDateInfo = document.createElement("p");
        movieDateInfo.textContent = "Release Date: " + data.Released;
        mediaBox.appendChild(movieDateInfo);

        var moviePlot = document.createElement("p");
        moviePlot.textContent = "Plot: " + data.Plot;
        mediaBox.appendChild(moviePlot);
    })

    requestOMDBUrl = "http://www.omdbapi.com/?t=" + heroInput + "&type=series&apikey=" + OMDBkey;
    fetch(requestOMDBUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        console.log(data.Title);

        var disclaimer = document.createElement("h5");
        disclaimer.textContent = "First Titular series";
        mediaBox.appendChild(disclaimer)
        
        var seriesPoster = document.createElement("img");
        seriesPoster.src = data.Poster;
        mediaBox.appendChild(seriesPoster);
        
        var seriesDateInfo = document.createElement("p");
        seriesDateInfo.textContent = "Release Date: " + data.Released;
        mediaBox.appendChild(seriesDateInfo);

        var seriesPlot = document.createElement("p");
        seriesPlot.textContent = "Plot: " + data.Plot;
        mediaBox.appendChild(seriesPlot);
    })
}

getParams();