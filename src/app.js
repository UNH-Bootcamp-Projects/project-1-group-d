var allCharactersArray = ["Iron Man", "Daredevil", "Spider-Man", "Hulk", "Thor", "Doctor Strange", "Captain America", "Wolverine", "Deadpool"];
var inputForm = document.querySelector("#input");
var heroSelect;

function handleSearchForm(event) {
  event.preventDefault();

  var heroInput = document.querySelector('#input').value;
  if(!heroInput) {
    console.error("No blank inputs allowed");
    return;
  }
  
  var queryString = "./character.html?q=" + heroInput;
  location.assign(queryString);
}

for(var i = 0; i < allCharactersArray.length; i++) {
  heroSelect = document.createElement("option");
  heroSelect.textContent = allCharactersArray[i];
  inputForm.appendChild(heroSelect);
}

document.querySelector("#input-form").addEventListener('submit', handleSearchForm);

