var allCharactersArray = ["Iron Man", "Daredevil", "Spider-Man", "Hulk", "Thor", "Captain America", "Doctor Strange", "Black Panther", "Wolverine"];
var inputForm = document.querySelector("#input");
var heroSelect;

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

for(var i = 0; i < allCharactersArray.length; ++i) {
  heroSelect = document.createElement("option");
  heroSelect.textContent = allCharactersArray[i];
  inputForm.appendChild(heroSelect);
}

document.querySelector("#input-form").addEventListener('submit', handleSearchForm);
