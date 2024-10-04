import { data } from "./data.js";

let recipes = [];
let obj = {};
const recipeContainer = document.getElementById("recipesContainer");
const removebutton = document.getElementById("buttonRemove");
const imageLink = document.getElementById("imageLink");
const inputName = document.getElementById("inputName");
const inputDescription = document.getElementById("inputDescription");
const inputSteps = document.getElementById("inputSteps");
const form = document.querySelector("form");

// async function fetchData() {
//   const response = await fetch("./Javascript/data.json");
//   const data = await response.json();
//   console.log(`data`, data);
//   return data.data;
// }

window.onload = async function () {
  loadRecipesFromStorage();
  uppdateUIInput();

  uppdateUI(data);
};
form.addEventListener("submit", function (event) {
  event.preventDefault();
  getVal();
  saveRecipesToStorage();
  loadRecipesFromStorage();
  uppdateUI(data);
});
removebutton.addEventListener("click", function (event) {
  localStorage.clear();
  recipes.splice(0);
});

function uppdateUIInput() {
  recipes.forEach((element) => {
    let newContent = document.createElement("div");
    newContent.innerHTML = `<div id="GeneratedContainer">
        <div id="gCV"><h2>${
          element.recipeName ?? "This recipe is nameless"
        }</h2>
        <img src="${
          element.recipeImage
        }" alt="This recipe does not have an image" />
        <div id="vertical"><p>${
          element.recipeDescription ?? "This recipe does not have a description"
        }</p></div>
        <ol>${element.recipeSteps}</ol></div></div>`;

    recipeContainer.appendChild(newContent);
  });
}
function checkExistance(obj) {
  let exists = recipes.some((element) => element.recipeName === obj.recipeName);

  if (exists) {
    console.log(`This recipe already exists, try another one.`);
  } else {
    recipes.push(obj);
  }
}
function getVal() {
  let recipeImage = imageLink.value;
  let recipeName = inputName.value;
  let recipeDescription = inputDescription.value;
  let recipeSteps = inputSteps.value;
  obj = {
    recipeName: recipeName,
    recipeImage: recipeImage,
    recipeDescription: recipeDescription,
    recipeSteps: recipeSteps,
  };
  checkExistance(obj);
}
function saveRecipesToStorage() {
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

// Load recipes from localStorage
function loadRecipesFromStorage() {
  const storedRecipes = localStorage.getItem("recipes");
  if (storedRecipes) {
    recipes = JSON.parse(storedRecipes);
    recipeContainer.innerHTML = "";
    uppdateUIInput();
  }
}

function uppdateUI(recipeList) {
  let steps = document.createElement("ol");
  for (const element of recipeList) {
    for (const x of element.analyzedInstructions[0].steps) {
      let newList = document.createElement("li");
      steps.appendChild(newList);
      newList.innerHTML += x.step;
    }
    console.log(element.analyzedInstructions[0].steps);
    let newContent = document.createElement("div");
    newContent.innerHTML = `<div id="GeneratedContainer">
        <div id="gCV"><h2>${element.title ?? "This recipe is nameless"}</h2>
        <img src="${element.image}" alt="This recipe does not have an image" />
        <div id="vertical"><p>${
          element.dishTypes.join(",  ") ??
          "This recipe does not have a description"
        }</p></div>
        <ol>${steps.innerHTML}</ol></div></div>`;

    recipeContainer.appendChild(newContent);
  }
}
