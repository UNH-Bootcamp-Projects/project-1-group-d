function getParams() {
    var searchParameters = document.location.search.split('&');

    var query = searchParameters[0].split('=').pop();

    getMarvelApi(query);
}

function getMarvelApi (heroInput) {
    // event.preventDefault();
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
      img.src = data.data.results[0].thumbnail.path + '/landscape_medium.jpg';
      document.getElementsByClassName('container')[0].appendChild(img)
    })
}

getParams();