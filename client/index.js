

const chocolateChip = document.querySelector("#chocolate_chip");
const chocolateChunk = document.querySelector("#chocolate_chunk");
const whiteChip = document.querySelector("#white_chip");
const smores = document.querySelector("#smores");
const randomRecipe = document.querySelector("#random_recipe");


const chocolateChipRedirect = function (event) {
  event.preventDefault()
  window.location.href = "http://localhost:5501/client/chocolateChip.html"
}

const chocolateChunkRedirect = function (event) {
  event.preventDefault()
  window.location.href = "http://localhost:5501/client/chocolateChunk.html"
}

const whiteChipRedirect = function (event) {
  event.preventDefault()
  window.location.href = "http://localhost:5501/client/whiteChip.html"
}

const smoresRedirect = function (event) {
  event.preventDefault()
  window.location.href = "http://localhost:5501/client/smores.html"
}

chocolateChip.addEventListener("click", chocolateChipRedirect);
chocolateChunk.addEventListener("click", chocolateChunkRedirect);
whiteChip.addEventListener("click", whiteChipRedirect);
smores.addEventListener("click", smoresRedirect);

let randomCookie = document.getElementById("random_recipe");
document.getElementById("random_recipe").onclick = function () {
  axios.get("http://localhost:4000/api/random_recipe").then(function (response) {
    const data = response.data;
    alert(data);
  });
};

randomRecipe.addEventListener("click", randomCookie);

const updateSuggestion = () => {
  axios.get("http://localhost:4000/api/suggestion").then((response) => {
    const suggestions = response.data;
    const suggestionSelect = document.getElementById('suggestion-delete');
    const suggestionDisplay = document.getElementById("suggestion-display");
    const suggestionList = document.createElement("ul");
    suggestionList.classList.add('styled-list');
    while(suggestionSelect.firstChild){
      suggestionSelect.removeChild(suggestionSelect.firstChild);
    }
    suggestions.forEach((suggestion) => {
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

document.getElementById('suggestion-form').onsubmit = 
event => event.preventDefault();

const submitSuggestionButton = (document.getElementById("submitSuggestionButton").onclick =
  function (event) {
    event.preventDefault();
    const suggestionText = document.getElementById("suggestion").value;
    axios.post("http://localhost:4000/api/suggestion", {
        suggestion: [suggestionText]
    }).then((response) => {
      updateSuggestion();
    });
  });


const deleteButton = (document.getElementById("deleteSuggestionButton").onclick =
function (event) {
    event.preventDefault();
  const currentSelectedSuggestion = document.getElementById('suggestion-delete').value;
  axios.delete("http://localhost:4000/api/suggestion", {
      params: {
        suggestion: currentSelectedSuggestion
      }
  }).then((response) => {
    updateSuggestion();
  });
});

updateSuggestion();

