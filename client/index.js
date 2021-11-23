const chocolateChip = document.querySelector("#chocolate_chip");
const chocolateChunk = document.querySelector("#chocolate_chunk");
const whiteChip = document.querySelector("#white_chip");
const smores = document.querySelector("#smores");
const randomRecipe = document.querySelector("#random_recipe");

const mouseOverEvent = (event) => {
  alert("Time to bake!");
};

chocolateChip.addEventListener("click", mouseOverEvent);
chocolateChunk.addEventListener("click", mouseOverEvent);
whiteChip.addEventListener("click", mouseOverEvent);
smores.addEventListener("click", mouseOverEvent);

let randomCookie = document.getElementById("random_recipe");
document.getElementById("random_recipe").onclick = function () {
  axios.get("http://localhost:4000/api/random_recipe/").then(function (response) {
    const data = response.data;
    alert(data);
  });
};

randomRecipe.addEventListener("click", randomCookie);

const updateSuggestion = () => {
  axios.get("http://localhost:4000/api/suggestion/").then((response) => {
    const suggestionSelect = response.data;
    const suggestionDisplay = document.getElementById("suggestion-display");
    const suggestionList = document.createElement("ul");
    while(suggestionSelect.firstChild){
        suggestionSelect.removeChild(suggestionSelect.firstChild);
    }
    goals.forEach((suggestion) => {
      const suggestionItem = document.createElement("li");
      suggestionItem.textContent = suggestion;
      suggestionList.appendChild(suggestionItem);
      const suggestionOption = document.createElement('option');
      suggestionOption.value = suggestion;
      suggestionOption.textContent = suggestion;
      suggestionSelect.appendChild(suggestionOption);
    });
    suggestionDisplay.replaceChildren(suggestionList);
  });
};

const submitSuggestionButton = (document.getElementById("flavor_suggestion").onclick =
  function (event) {
    event.preventDefault();
    const suggestionText = document.getElementById("suggestion").value;
    axios.post("http://localhost:4000/api/suggestion/", {
        suggestion: [suggestionText]
    }).then((response) => {
      updateSuggestion();
    });
  });


const deleteButton = (document.getElementById("deleteSuggestionButton").onclick =
function (event) {
    event.preventDefault();
  const currentSelectedSuggestion = document.getElementById('suggestion-delete').value;
  axios.delete("http://localhost:4000/api/suggestion/", {
      params: {
        suggestion: currentSelectedSuggestion
      }
  }).then((response) => {
    updateSuggestion();
  });
});