const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/random_recipe", (req, res) => {
  const cookies = [
    "Bake Chocolate Chip cookies today. They are a classic!",
    "Triple Chocolate Chunk Cookies are always a good choice.",
    "White Chip Macadamia Nut Cookies are amazing. Give 'em a shot!",
    "Try baking the S'mores Cookies. They are an excellent choice!",
  ];
  let randomIndex = Math.floor(Math.random() * cookies.length);
  let randomCookie = cookies[randomIndex];

  res.status(200).send(randomCookie);
});


let savedSuggestion = [];

app.get(
  "/api/suggestion",
  (getSuggestion = (req, res) => {
    res.status(200).send(savedSuggestion);
  })
);

app.post(
  "/api/suggestion",
  (createSuggestion = (req, res) => {
    let { suggestion } = req.body;
    savedSuggestion = savedSuggestion.concat(suggestion);
    res.status(200).send();
  })
);

  app.delete(
    "/api/suggestion",
    deleteSuggestion = (req, res) => {
      let {suggestion} = req.query;
      console.log(suggestion)
      const suggestionIndex = savedSuggestion.indexOf(suggestion);
        savedSuggestion.splice(suggestionIndex, 1);
        res.status(200).send();
    })

app.listen(4000, () => console.log("Server running on 4000"));

