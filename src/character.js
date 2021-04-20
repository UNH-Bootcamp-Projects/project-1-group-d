// Queryselectors
var charIMG = document.querySelector("#charimg");
var searchBox = document.querySelector("#search");
var bioBox = document.querySelector("#bio");
var mediaBox = document.querySelector("#media");

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
      
      var img = document.createElement('img');
      img.src = data.data.results[0].thumbnail.path + '/portrait_fantastic.jpg';
      charIMG.appendChild(img);
      
      var biograpghy = document.createElement('p');
      biograpghy.innerHTML = data.data.results[0].description + "<br><a href=\"" + data.data.results[0].urls[1].url + "\">Read More<a>";
      bioBox.appendChild(biograpghy);
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
        // if (data.Poster) {
        //     console.log(data.Poster);
        // }
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