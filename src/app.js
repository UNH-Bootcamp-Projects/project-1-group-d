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

document.querySelector("#input-form").addEventListener('submit', handleSearchForm);