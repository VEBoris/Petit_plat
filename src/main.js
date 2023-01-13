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

async function displayRecipes(recipes) {
  const recipesSection = document.querySelector('#recipes-container');

  recipes.forEach((recipe) => {
      const recipeTemplate = recipesFactory(recipe);
      const recipeDom = recipeTemplate.getRecipesDOM();
      recipesSection.appendChild(recipeDom);

  });
}

ingredientsChevron.addEventListener('click', (e) => {
  if (cssmodif[0].classList.contains('active')) {
      closeList(cssmodif[0]);
      appareilsInput.placeholder = `Ingrédients`;
      console.log("ok");
  } else {
      openList(cssmodif[0]);
      appareilsInput.placeholder = `Rechercher un ingrédient`;
      closeList(cssmodif[1]);
      ingredientsInput.placeholder = `Appareil`;
      closeList(cssmodif[2]);
      ustensilsInput.placeholder = `Ustensiles`;
  }
});


appareilsChevron.addEventListener('click', (e) => {
  if (cssmodif[1].classList.contains('active')) {
      closeList(cssmodif[1]);
      appareilsInput.placeholder = `Appareils`;
      console.log("ok");
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
      console.log("ok");
  } else {
      openList(cssmodif[2]);
      ustensilsInput.placeholder = `Rechercher un ustensile`;
      closeList(cssmodif[0]);
      ingredientsInput.placeholder = `Ingrédients`;
      closeList(cssmodif[1]);
      appareilsInput.placeholder = `Appareils`;
  }
});


function displayIngredients() {
  let array = [];
  let ingredientsItem = [];
  for (let i = 0; i < recipes.length; i++) {
    array.push(recipes[i].ingredients);
  }

  for (let el in array) {
    for (let j = 0; j < array[el].length; j++) {
        let items = array[el][j].ingredient;
        ingredientsItem.push(items.toLocaleLowerCase());
    };

}
let repetitionIngredients = ingredientsItem.filter((item, index) => ingredientsItem.indexOf(item) === index).sort();
for (let l = 0; l < repetitionIngredients.length; l++) {
    ingredientsUl.innerHTML += `<li class="item" data-value='${repetitionIngredients[l]}'>${repetitionIngredients[l]}</li>`;

  }
}

function displayAppareils() {
  let appareilsItems = [];
  for (let i = 0; i < recipes.length; i++) {
      appareilsItems.push(recipes[i].appliance.toLocaleLowerCase());
  }
  let repetitionAppareils = appareilsItems.filter((item, index) => appareilsItems.indexOf(item) === index).sort();
  for (let j = 0; j < repetitionAppareils.length; j++) {
      appareilsUl.innerHTML += `<li class="item" data-value="${repetitionAppareils[j]}" >${repetitionAppareils[j]}</li>`;
  }
}

function displayUstensils() {
  let ustensilsItem = [];
  for (let k = 0; k < recipes.length; k++) {
      ustensilsItem.push(recipes[k].ustensils[0].toLocaleLowerCase());
  }
  let repetitionUstensils = ustensilsItem.filter((item, index) => ustensilsItem.indexOf(item) === index).sort();
  for (let l = 0; l < repetitionUstensils.length; l++) {
      ustensilsUl.innerHTML += `<li class="item" data-value='${repetitionUstensils[l]}'>${repetitionUstensils[l]}</li>`;
  }
}

function openList(cssmodif) {
  cssmodif.classList.add('active');
}

function closeList(cssmodif) {
  cssmodif.classList.remove('active');
}


async function init() {


  displayRecipes(recipes);
  displayAppareils();
  displayUstensils();
  displayIngredients();
}
init();