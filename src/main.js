import { recipes } from "../data/recipes.js";

const ingredientsUl = document.getElementById("ingredients-list");
const appareilsUl = document.getElementById("appareils-list");
const ustensilsUl = document.getElementById("ustensiles-list");
const ingredientsChevron = document.getElementById("ingredients-chevron");
const appareilsChevron = document.getElementById("appareils-chevron");
const ustensilsChevron = document.getElementById("ustensiles-chevron");
const cssmodif = document.querySelectorAll(".advanced-search-btn");
const ingredientsInput = document.getElementById('ingredients');
const appareilsInput = document.getElementById('appareils');
const ustensilsInput = document.getElementById('ustensiles');
const mainSearchinput = document.getElementById('main-search');
const recipesSection = document.querySelector('#recipes-container');
let filterrecipes = [];

//function for displaying all the recipes
async function displayRecipes(recipes) {
  recipesSection.innerHTML = '';
  recipes.forEach((item) => {
      const recipeTemplate = recipesFactory(item);
      const recipeDom = recipeTemplate.getRecipesDOM();
      recipesSection.appendChild(recipeDom);

  });
}

ingredientsChevron.addEventListener("click", (e) => {chevron( 'ingrédient', "Ingrédients", 0, ingredientsInput);});
appareilsChevron.addEventListener("click", (e) => {chevron( 'appareil', "Appareils", 1, appareilsInput);});
ustensilsChevron.addEventListener("click", (e) => {chevron( 'ustensil', "Ustensils", 2, ustensilsInput);});

//funtion for closing list of ingrédient, appliance and ustencil
function closeList(cssmodif, input, nom) {
  cssmodif.classList.remove('active');
  input.placeholder = nom;
}

//function for unfolding list of ingrédient, appliance and ustencil with the chevron
function chevron(type, nom, index, input){
  if ( cssmodif[index].classList.contains ('active')) {
    closeList(cssmodif[index], input, nom);
  } else {
    openList(cssmodif[index]);
    input.placeholder = 'Rechercher un '+type;

    switch (index) {
      case 0:
        closeList(cssmodif[1], appareilsInput, "Appareils" );
        closeList(cssmodif[2], ustensilsInput, "Ustensiles");
        break;
      case 1:
        closeList(cssmodif[0], ingredientsInput, "Ingrédient");
        closeList(cssmodif[2], ustensilsInput, "Ustensiles");
        break;
      case 2:
        closeList(cssmodif[0], ingredientsInput, "Ingrédient");
        closeList(cssmodif[1], appareilsInput, "Appareils");
        break;
    }
  }
}

//function for displaying the ingredients in his list and for removing repetition in the list
function displayIngredients(recipes) {
  let ingredientsItem = [];
  ingredientsUl.innerHTML = "";
  for (let i = 0; i < recipes.length; i++) {
    recipes[i].ingredients.forEach (i => ingredientsItem.push(i.ingredient.toLowerCase()));
  }
  let repetitionIngredients = ingredientsItem.filter((item, index) => ingredientsItem.indexOf(item) === index).sort();
  for (let l = 0; l < repetitionIngredients.length; l++) {
      ingredientsUl.innerHTML += `<li class="item ingredients-result" data-value='${repetitionIngredients[l]}'>${repetitionIngredients[l]}</li>`;
  }
}

//function for displaying the appliances in his list and for removing repetition in the list
function displayAppareils(recipes) {
  let appareilsItems = [];
  appareilsUl.innerHTML = '';
  for (let i = 0; i < recipes.length; i++) {
    appareilsItems.push(recipes[i].appliance.toLowerCase());
  }
  let repetitionAppareils = appareilsItems.filter((item, index) => appareilsItems.indexOf(item) === index).sort();
  for (let j = 0; j < repetitionAppareils.length; j++) {
    appareilsUl.innerHTML += `<li class="item appareils-result" data-value="${repetitionAppareils[j]}" >${repetitionAppareils[j]}</li>`;
  }
}

//function for displaying the ustencils in his list and for removing repetition in the list
function displayUstensils(recipes) {
  let ustensilsItem = [];
  ustensilsUl.innerHTML = '';
  for (let k = 0; k < recipes.length; k++) {
    recipes[k].ustensils.forEach (u => ustensilsItem.push(u.toLowerCase()))
  }
  let repetitionUstensils = ustensilsItem.filter((item, index) => ustensilsItem.indexOf(item) === index).sort();
  for (let l = 0; l < repetitionUstensils.length; l++) {
    ustensilsUl.innerHTML += `<li class="item ustensils-result" data-value='${repetitionUstensils[l]}'>${repetitionUstensils[l]}</li>`;
  }
}

function openList(cssmodif) {
  cssmodif.classList.add('active');
}

function updatemedia(items) {
  displayIngredients(items);
  displayAppareils(items);
  displayUstensils(items);
  addTagIngredient();
  addTagappareil();
  addTagustensil();
  closeTag();
}

//funtion for finding the selected data value for ingredients
function addTagIngredient() {
  const ingredientsResult = document.querySelectorAll(".ingredients-result"); // Ingrédients de la liste
  for (let i = 0; i < ingredientsResult.length; i++) {
    ingredientsResult[i].addEventListener("click", (e) => {
      addtaglist(e, "Ingrédients", "ingredients", 0, ingredientsInput);
    });
  }
}

//funtion for finding the selected data value for appliances
function addTagappareil() {
  const appareilsResult = document.querySelectorAll(".appareils-result"); // Appareils de la liste
  for (let i = 0; i < appareilsResult.length; i++) {
    appareilsResult[i].addEventListener("click", (e) => {
      addtaglist(e, "Appareils", "appareils", 1, appareilsInput);
    });
  }
}

//funtion for finding the selected data value for ustensils
function addTagustensil() {
  const ustensilsResult = document.querySelectorAll(".ustensils-result"); // Ustensils de la liste
  for (let i = 0; i < ustensilsResult.length; i++) {
    ustensilsResult[i].addEventListener("click", (e) => {
      addtaglist(e, "Ustensils", "ustensils", 2, ustensilsInput);
    });
  }
}

//function for adding & filtering tags
function addtaglist(event, nom, type, index, input) {
let itemsSelected = event.target.innerText;
const searchTag = document.querySelector( '#search-tag' );
let tagsContainer = document.createElement("div");
tagsContainer.classList.add(""+type+"-inlinetag");
tagsContainer.classList.add("active");
tagsContainer.innerHTML =`<div class='items-${type} tag'>${itemsSelected}</div> <i class='far fa-times-circle close-button'></i>` ;
searchTag.appendChild(tagsContainer);
closeList(cssmodif[index], input, nom);

filterrecipes = filterrecipes.filter((recipe) => {
  switch (index) {
    case 0:
       return(recipe.ingredients.some((el) => el.ingredient.toLowerCase().includes(itemsSelected)));
      break;
    case 1:
       return(recipe.appliance.toLowerCase().includes(itemsSelected));
      break;
    case 2:
      return (recipe.ustensils.some((el) => el.toLowerCase().includes(itemsSelected)));
      break;
  }
});
  updatemedia(filterrecipes);
  displayRecipes(filterrecipes)
}

//function for closing the tags and re-filtering
function closeTag() {
  const closeTags = document.querySelectorAll('.close-button');
  for (let i = 0; i < closeTags.length; i++) {
      const element = closeTags[i];
      element.addEventListener('click', removeClassActive, searchTags);
  }
}

//funtion for re-filtering when closing tags (with tags and search bar)
function removeClassActive(button) {
  let btnclose = button.target;
  btnclose.parentElement.remove();
  filterrecipes = recipes;

searchTags();
searchMainBar();
updatemedia(filterrecipes);
displayRecipes(filterrecipes)
}

//function for multiple selected tags
function searchTags() {
  let tagIngredient = document.getElementsByClassName ('items-ingredients');
  let tagAppareil = document.getElementsByClassName ('items-appareils');
  let tagUstensil = document.getElementsByClassName ('items-ustensils');
  let tagIngredientSelected = document.querySelector ('.items-ingredients');
  let tagAppareilSelected = document.querySelector ('.items-appareils');
  let tagUstensilSelected = document.querySelector ('.items-ustensils');

  filterrecipes = filterrecipes.filter((recipe) => {
      if ( tagIngredient.length > 0 && tagAppareil.length == 0 && tagUstensil.length == 0) {
        return (recipe.ingredients.some((el) => uniformString(el.ingredient).includes(tagIngredientSelected.textContent)));
      }
      else if (tagAppareil.length > 0 && tagIngredient.length == 0 && tagUstensil.length == 0) {
        return (recipe.appliance).includes(tagAppareilSelected.textContent);
      }
      else if (tagUstensil.length > 0 && tagIngredient.length == 0 && tagAppareil.length == 0) {
        return (recipe.ustensils.some((el) => uniformString(el).includes(tagUstensilSelected.textContent)));
      }
      else if (tagUstensil.length == 0 && tagIngredient.length == 0 && tagAppareil.length == 0) {
        return filterrecipes.filter
      }
      });
}

//function for searching ingredients in the list
function searchIngredient() {
  ingredientsInput.addEventListener('keyup', (e) => {
      openList(cssmodif[0]);
      ingredientsInput.placeholder = `Rechercher un ingrédient`;
      let ingredientsString = uniformString(e.target.value.toLowerCase());
      const array = filterrecipes.length == 0 ? recipes : filterrecipes;
      if (ingredientsString.length >= 3) {
          filterrecipes = array.filter((recipe) => {
              return (recipe.ingredients.some((el) => uniformString(el.ingredient).includes(ingredientsString)));
          });
          updatemedia(filterrecipes);
          ingredientsInput.placeholder = `Ingrédients`;
      }
      else {
        updatemedia(recipes)
      }
  });
}

//function for searching aplliances in the list
function searchAppareils() {
  appareilsInput.addEventListener('keyup', (e) => {
      openList(cssmodif[1]);
      appareilsInput.placeholder = `Rechercher un appareils`;
      let appareilsString = uniformString(e.target.value.toLowerCase());
      const array = filterrecipes.length == 0 ? recipes : filterrecipes;
      if (appareilsString.length >= 3) {
          filterrecipes = array.filter((recipe) => {
              return (uniformString(recipe.appliance).includes(appareilsString));
          });
          updatemedia(filterrecipes);
          appareilsInput.placeholder = `Appareils`;
      }
      else {
        updatemedia(recipes)
      }
  });
}

//function for searching ustencils in the list
function searchUstensils() {
  ustensilsInput.addEventListener('keyup', (e) => {
      openList(cssmodif[2]);
      ustensilsInput.placeholder = `Rechercher un ustensils`;
      let ustensilsString = uniformString(e.target.value.toLowerCase());
      const array = filterrecipes.length == 0 ? recipes : filterrecipes;
      if (ustensilsString.length >= 3) {
          filterrecipes = array.filter((recipe) => {
              return ((recipe.ustensils.some((el) => uniformString(el).includes(ustensilsString)
            )));
          });
          updatemedia(filterrecipes);
          ustensilsInput.placeholder = `Ustensils`;
      }
      else {
        updatemedia(recipes)
      }
  });
}

//Algo 2 for searching in the main bar
function searchMainBar() {
      const searchString = uniformString(mainSearchinput.value.toLowerCase());
      if (searchString.length >= 3) {
        filterrecipes = filterrecipes.filter((recipe) => {
      return (uniformString(recipe.name).toLowerCase().includes(searchString) || uniformString(recipe.description).toLowerCase().includes(searchString) ||
        recipe.ingredients.some((el) => uniformString(el.ingredient).includes(searchString)));
        });
      }
}

//function for facilitating the wtitting in the search bar
function uniformString(string) {
  string = string
      .normalize("NFC")
      .replace(/[\u0300-\u036f]/g, "");

  string = string.toLowerCase();

  string = string
      .replace(/œ/g, "oe")
      .replace(/æ/g, "ae")
      .replace(/[']/g, " ");

  return string;
}

async function init() {
  filterrecipes = recipes;
  displayRecipes(recipes);
  displayAppareils(recipes);
  displayUstensils(recipes);
  displayIngredients(recipes);
  searchIngredient();
  searchAppareils();
  searchUstensils();
  addTagIngredient();
  addTagappareil();
  addTagustensil();
  mainSearchinput.addEventListener('keyup', (e) => {
    if (e.key == 'Backspace') {
      filterrecipes = recipes
      searchTags();
    }
    searchMainBar();
    displayRecipes(filterrecipes);
    updatemedia(filterrecipes);
  });
}
init();