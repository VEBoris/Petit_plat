import { recipes } from "../../data/recipes.js";

const ingredientsUl = document.getElementById("ingredients-list");
const appareilsUl = document.getElementById("appareils-list");
const ustensilsUl = document.getElementById("ustensiles-list");
const appareilsChevron = document.getElementById("appareils-chevron");
const ustensilsChevron = document.getElementById("ustensiles-chevron");
const ingredientsChevron = document.getElementById("ingredients-chevron");
const cssmodif = document.querySelectorAll(".advanced-search-btn");
const appareilsInput = document.getElementById('appareils');
const ustensilsInput = document.getElementById('ustensiles');
const ingredientsInput = document.getElementById('ingredients');
const recipesSection = document.querySelector('#recipes-container');
let tagArrayselected = [];
let repetitionIngredients = [];
let filterrecipes = [];
let newfilterrecipes = [];

async function displayRecipes(recipes) {
  recipesSection.innerHTML = '';
  recipes.forEach((item) => {
      const recipeTemplate = recipesFactory(item);
      const recipeDom = recipeTemplate.getRecipesDOM();
      recipesSection.appendChild(recipeDom);

  });
}

ingredientsChevron.addEventListener('click', (e) => {
  if (cssmodif[0].classList.contains('active')) {
      closeList(cssmodif[0]);
      ingredientsInput.placeholder = `Ingrédients`;
  } else {
      openList(cssmodif[0]);
      ingredientsInput.placeholder = `Rechercher un ingrédient`;
      closeList(cssmodif[1]);
      appareilsInput.placeholder = `Appareil`;
      closeList(cssmodif[2]);
      ustensilsInput.placeholder = `Ustensiles`;
  }
});


appareilsChevron.addEventListener('click', (e) => {
  if (cssmodif[1].classList.contains('active')) {
      closeList(cssmodif[1]);
      appareilsInput.placeholder = `Appareils`;
  } else {
      openList(cssmodif[1]);
      appareilsInput.placeholder = `Rechercher un appareil`;
      closeList(cssmodif[0]);
      ingredientsInput.placeholder = `Ingrédients`;
      closeList(cssmodif[2]);
      ustensilsInput.placeholder = `Ustensiles`;
  }
});

ustensilsChevron.addEventListener('click', () => {

  if (cssmodif[2].classList.contains('active')) {
      closeList(cssmodif[2]);
      ustensilsInput.placeholder = `Ustensiles`;
  } else {
      openList(cssmodif[2]);
      ustensilsInput.placeholder = `Rechercher un ustensile`;
      closeList(cssmodif[0]);
      ingredientsInput.placeholder = `Ingrédients`;
      closeList(cssmodif[1]);
      appareilsInput.placeholder = `Appareils`;
  }
});

function displayIngredients(recipes) {
  let array = [];
  let ingredientsItem = [];
  ingredientsUl.innerHTML = "";
  for (let i = 0; i < recipes.length; i++) {
      array.push(recipes[i].ingredients);
  }

  for (let el in array) {
      for (let j = 0; j < array[el].length; j++) {
          let items = array[el][j].ingredient;
          ingredientsItem.push(items.toLowerCase());

      };

  }
  repetitionIngredients = ingredientsItem.filter((item, index) => ingredientsItem.indexOf(item) === index).sort();
  for (let l = 0; l < repetitionIngredients.length; l++) {
      ingredientsUl.innerHTML += `<li class="item ingredients-result" data-value='${repetitionIngredients[l]}'>${repetitionIngredients[l]}</li>`;

  }

}

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

function displayUstensils(recipes) {
  let array = [];
  let ustensilsItem = [];
  ustensilsUl.innerHTML = '';
  for (let k = 0; k < recipes.length; k++) {
      array.push(recipes[k].ustensils);
  }
  for (let el in array) {
      for (let j = 0; j < array[el].length; j++) {
          let items = array[el][j];
          ustensilsItem.push(items.toLowerCase());

      };

  }

  let repetitionUstensils = ustensilsItem.filter((item, index) => ustensilsItem.indexOf(item) === index).sort();
  for (let l = 0; l < repetitionUstensils.length; l++) {
      ustensilsUl.innerHTML += `<li class="item ustensils-result" data-value='${repetitionUstensils[l]}'>${repetitionUstensils[l]}</li>`;
  }
}

function openList(cssmodif) {
  cssmodif.classList.add('active');
}

function closeList(cssmodif) {
  cssmodif.classList.remove('active');
}

function updatemedia(items) {
  displayRecipes(items);
  displayIngredients(items);
  displayAppareils(items);
  displayUstensils(items);
  addTagIngredient();
  addTagappareil();
  addTagustensil();
  closeTag();
}

function addTagIngredient() {
  const ingredientsResult = document.querySelectorAll(".ingredients-result"); // Ingrédients de la liste
  for (let i = 0; i < ingredientsResult.length; i++) {
      ingredientsResult[i].addEventListener("click", addIngredient, );
  }
}

function addTagappareil() {
  const appareilsResult = document.querySelectorAll(".appareils-result"); // Ingrédients de la liste
  for (let i = 0; i < appareilsResult.length; i++) {
      appareilsResult[i].addEventListener("click", addAppareil);
  }
}

function addTagustensil() {
  const ustensilsResult = document.querySelectorAll(".ustensils-result"); // Ingrédients de la liste
  for (let i = 0; i < ustensilsResult.length; i++) {
      ustensilsResult[i].addEventListener("click", addustensils);
  }
}

function addIngredient(ingredientEvent) {
    let itemsSelected = ingredientEvent.target.innerText;
    const searchTag = document.querySelector('#search-tag');
    let tagContainer = document.createElement("div");
    tagContainer.innerHTML = '';
    tagContainer.classList.add("ingredients-inlinetag");
    tagContainer.classList.add("active");
    tagContainer.innerHTML = `<div class='items-ingredients tag'>${itemsSelected}</div> <i class="far fa-times-circle close-button"></i>`;
    searchTag.appendChild(tagContainer);
    closeList(cssmodif[0]);

    tagArrayselected.push(itemsSelected);
    const array = filterrecipes.length == 0 ? recipes : filterrecipes;

    filterrecipes = array.filter((recipe) => {

        return (recipe.ingredients.some((el) =>
            uniformString(el.ingredient).includes(itemsSelected)
        ));
    });


    updatemedia(filterrecipes);

    ingredientsInput.placeholder = `Ingrédients`;
}

function addAppareil(appareilEvent) {
  let itemsSelected = appareilEvent.target.innerText;
  const searchTag = document.querySelector('#search-tag');
  let tagsContainer = document.createElement("div");
  tagsContainer.innerHTML = '';
  tagsContainer.classList.add("appareils-inlinetag");
  tagsContainer.classList.add("active");
  tagsContainer.innerHTML = `<div class='items-appareils tag'>${itemsSelected}</div> <i class="far fa-times-circle close-button"></i>`;
  searchTag.appendChild(tagsContainer);
  closeList(cssmodif[1]);

  tagArrayselected.push(itemsSelected);

  const array = filterrecipes.length == 0 ? recipes : filterrecipes;

  filterrecipes = array.filter((recipe) => {

      return (uniformString(recipe.appliance).includes(itemsSelected));

  });
  updatemedia(filterrecipes);
  appareilsInput.placeholder = `Appareils`;
}

function addustensils(ustensilsEvent) {
  let itemsSelected = ustensilsEvent.target.innerText;
  const searchTag = document.querySelector('#search-tag');
  let tagsContainers = document.createElement("div");
  tagsContainers.innerHTML = '';
  tagsContainers.classList.add("ustensils-inlinetag");
  tagsContainers.classList.add("active");
  tagsContainers.innerHTML = `<div class='items-ustensils tag'>${itemsSelected}</div> <i class="far fa-times-circle close-button"></i>`;
  searchTag.appendChild(tagsContainers);
  closeList(cssmodif[2]);

  tagArrayselected.push(itemsSelected);

  const array = filterrecipes.length == 0 ? recipes : filterrecipes;

  filterrecipes = array.filter((recipe) => {

      return (recipe.ustensils.some((el) =>
          uniformString(el).includes(itemsSelected)
      ));

  });
  updatemedia(filterrecipes);
  ustensilsInput.placeholder = `Ustensils`;
}

function closeTag() {
  const closeTags = document.querySelectorAll('.close-button');
  for (let i = 0; i < closeTags.length; i++) {
      const element = closeTags[i];
      element.addEventListener('click', RemoveClassActive);
  }
}

function RemoveClassActive(button) {
  let btnclose = button.target;
  btnclose.parentElement.classList.remove('active');
  let item = btnclose.previousElementSibling.innerHTML;
  let itemsing = document.querySelectorAll('.tag');
  tagArrayselected = tagArrayselected.filter((tag) => tag != item);
  let array = filterrecipes.length !== 0 ? recipes : newfilterrecipes;
  if (tagArrayselected.length == 0) {
    array = recipes;
    filterrecipes = [];
}
let tagcurrentingredient = btnclose.parentElement.classList.contains('ingredients-inlinetag');
let tagcurrentappareils = btnclose.parentElement.classList.contains('appareils-inlinetag');
let tagcurrentustensils = btnclose.parentElement.classList.contains('ustensils-inlinetag');
if (tagcurrentingredient) {


    newfilterrecipes = array.filter((recipe) => {

        return (
            recipe.ingredients.some((el) =>
                uniformString(el.ingredient).includes(tagArrayselected)
            ) || uniformString(recipe.appliance).includes(tagArrayselected)) || (recipe.ustensils.some((el) =>
            uniformString(el).includes(tagArrayselected)
        ));
    });
    updatemedia(newfilterrecipes);
} else if (tagcurrentappareils) {

  newfilterrecipes = array.filter((recipe) => {

      return (uniformString(recipe.appliance).includes(tagArrayselected) || (recipe.ustensils.some((el) =>
              uniformString(el).includes(tagArrayselected)
          )) ||
          recipe.ingredients.some((el) =>
              uniformString(el.ingredient).includes(tagArrayselected)
          ));
  });
  updatemedia(newfilterrecipes);
} else if (tagcurrentustensils) {
  newfilterrecipes = array.filter((recipe) => {
      return ((recipe.ustensils.some((el) =>
              uniformString(el).includes(tagArrayselected)
          )) || uniformString(recipe.appliance).includes(tagArrayselected) ||
          recipe.ingredients.some((el) =>
              uniformString(el.ingredient).includes(tagArrayselected)
          ));
  });
  updatemedia(newfilterrecipes);
} else {
  console.log("error");
}
}

function searchIngredient() {
  ingredientsInput.addEventListener('keyup', (e) => {
      openList(cssmodif[0]);
      ingredientsInput.placeholder = `Rechercher un ingrédient`;
      let ingredientString = uniformString(e.target.value.toLowerCase());
      const array = filterrecipes.length == 0 ? recipes : filterrecipes;
      if (ingredientString.length >= 3) {
          filterrecipes = array.filter((recipe) => {
              return (recipe.ingredients.some((el) => uniformString(el.ingredient).includes(ingredientString)));
          });
          updatemedia(filterrecipes);
          displayIngredients(filteredIngredients);
          addTagIngredient();
          ingredientsInput.placeholder = `Ingrédients`;
      }

  });
}

function searchAppareils() {
  appareilsInput.addEventListener('keyup', (e) => {
      openList(cssmodif[1]);
      ingredientsInput.placeholder = `Rechercher un ingrédient`;
      let appareilsString = uniformString(e.target.value.toLowerCase());
      const array = filterrecipes.length == 0 ? recipes : filterrecipes;
      if (appareilsString.length >= 3) {
          filterrecipes = array.filter((recipe) => {
              return (uniformString(recipe.appliance).includes(appareilsString));
          });
          updatemedia(filterrecipes);
          appareilsInput.placeholder = `Appareils`;
      }
  });
}

function searchUstensils() {
  ustensilsInput.addEventListener('keyup', (e) => {
      openList(cssmodif[2]);
      ingredientsInput.placeholder = `Rechercher un ingrédient`;
      let ustensilsString = uniformString(e.target.value.toLowerCase());
      const array = filterrecipes.length == 0 ? recipes : filterrecipes;
      if (ustensilsString.length >= 3) {
          filterrecipes = array.filter((recipe) => {
              return ((recipe.ustensils.some((el) =>
                  uniformString(el).includes(ustensilsString)
              )));
          });
          updatemedia(filterrecipes);
          ustensilsInput.placeholder = `Ustensils`;
      }
  });
}

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
}
init();