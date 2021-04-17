function handleSearchForm(event) {
  event.preventDefault();

  var heroInput = document.querySelector('#input').value;
  if(!heroInput) {
    console.error("No blank inputs allowed");
    return;
  }

  let apikey = "8dc274afb84abf0f19f28c01d6ac7425";
  let requestUrl = "https://gateway.marvel.com:443/v1/public/characters?name=" + heroInput + "&orderBy=name&apikey=" + apikey + "&ts=1&hash=6262a02cba8e28cbd51f531c1e20a49f" 

  fetch(requestUrl)
  .then(function(response) {
      return response.json();
  })
  .then(function(data) {
    if(data.data.results[0].description) {
      var queryString = "./character.html?q=" + heroInput;
      location.assign(queryString);
    }
  })
}

document.querySelector("#input-form").addEventListener('submit', handleSearchForm);