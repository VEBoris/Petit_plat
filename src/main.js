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
let tagArrayselected = [];
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

ingredientsChevron.addEventListener("click", (e) => {chevron( 'ingrédient', "Ingrédients", 0, ingredientsInput);});
appareilsChevron.addEventListener("click", (e) => {chevron( 'appareil', "Appareils", 1, appareilsInput);});
ustensilsChevron.addEventListener("click", (e) => {chevron( 'ustensil', "Ustensils", 2, ustensilsInput);});

function closeList(cssmodif, input, nom) {
  cssmodif.classList.remove('active');
  input.placeholder = nom;
}
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

function addTagIngredient() {
  const ingredientsResult = document.querySelectorAll(".ingredients-result"); // Ingrédients de la liste
  for (let i = 0; i < ingredientsResult.length; i++) {
    ingredientsResult[i].addEventListener("click", (e) => {
      addtaglist(e, "Ingrédients", "ingredients", 0, ingredientsInput);
    });
  }
}

function addTagappareil() {
  const appareilsResult = document.querySelectorAll(".appareils-result"); // Appareils de la liste
  for (let i = 0; i < appareilsResult.length; i++) {
    appareilsResult[i].addEventListener("click", (e) => {
      addtaglist(e, "Appareils", "appareils", 1, appareilsInput);
    });
  }
}

function addTagustensil() {
  const ustensilsResult = document.querySelectorAll(".ustensils-result"); // Ustensils de la liste
  for (let i = 0; i < ustensilsResult.length; i++) {
    ustensilsResult[i].addEventListener("click", (e) => {
      addtaglist(e, "Ustensils", "ustensils", 2, ustensilsInput);
    });
  }
}

function addtaglist(event, nom, type, index, input) {
let itemsSelected = event.target.innerText;
const searchTag = document.querySelector( '#search-tag' );
let tagsContainer = document.createElement("div");
tagsContainer.innerHTML = '';
tagsContainer.classList.add(""+type+"-inlinetag");
tagsContainer.classList.add("active");
tagsContainer.innerHTML =`<div class='items-${type}' tag'>${itemsSelected}</div> <i class='far fa-times-circle close-button'></i>` ;
searchTag. appendChild(tagsContainer);
closeList(cssmodif[index], input, nom);

tagArrayselected.push(itemsSelected);

const array = filterrecipes.length == 0 ? recipes : filterrecipes;
filterrecipes = array.filter((recipe) => {
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

function closeTag() {
  const closeTags = document.querySelectorAll('.close-button');
  for (let i = 0; i < closeTags.length; i++) {
      const element = closeTags[i];
      element.addEventListener('click', removeClassActive);
  }
}

function removeClassActive(button) {
  let btnclose = button.target;
  btnclose.parentElement.classList.remove('active');
  let item = btnclose.previousElementSibling.innerHTML;
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
    displayRecipes(newfilterrecipes);
} 
else if (tagcurrentappareils) {
  newfilterrecipes = array.filter((recipe) => {
      return (uniformString(recipe.appliance).includes(tagArrayselected) || (recipe.ustensils.some((el) =>
              uniformString(el).includes(tagArrayselected)
          )) ||
          recipe.ingredients.some((el) =>
              uniformString(el.ingredient).includes(tagArrayselected)
          ));
  });
  updatemedia(newfilterrecipes);
  displayRecipes(newfilterrecipes)
} 
else if (tagcurrentustensils) {
  newfilterrecipes = array.filter((recipe) => {
      return ((recipe.ustensils.some((el) =>
              uniformString(el).includes(tagArrayselected)
          )) || uniformString(recipe.appliance).includes(tagArrayselected) ||
          recipe.ingredients.some((el) =>
              uniformString(el.ingredient).includes(tagArrayselected)
          ));
  });
  updatemedia(newfilterrecipes);
  displayRecipes(newfilterrecipes)
} 
else {
  console.log("error");
}
}

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

  });
}

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
  });
}

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
  });
}

// ingredientsInput.addEventListener("keyup", (e) => {searchItem( 'ingrédient', "Ingrédients", 0, ingredientsInput);});
// appareilsInput.addEventListener("keyup", (e) => {searchItem( 'appareil', "Appareils", 1, appareilsInput);});
// ustensilsInput.addEventListener("keyup", (e) => {searchItem( 'ustensil', "Ustensils", 2, ustensilsInput);});

// function searchItem(event, type, nom, index, input) {
//     openList(cssmodif[index]);
//     input.placeholder = `Rechercher un`+type;
//     let itemString = uniformString(event.target.value.toLowerCase());
//     const array = filterrecipes.length == 0 ? recipes : filterrecipes;
//     if (itemString.length >= 3) {
//       filterrecipes = array.filter((recipe) => {
//         switch (index) {
//           case 0:
//              return (recipe.ingredients.some((el) => uniformString(el.ingredient).includes(ingredientsString)));
//             break;
//           case 1:
//             return (uniformString(recipe.appliance).includes(appareilsString));
//             break;
//           case 2:
//             return ((recipe.ustensils.some((el) => uniformString(el).includes(ustensilsString)
//             break;
//         }
//       });
//       updatemedia(filterrecipes);
//       input.placeholder = nom;
//     }
// }

//Algo 2
function searchMainBar() {
  mainSearchinput.addEventListener('keyup', (e) => {
      let filterSearchBar = [];
      const searchString = uniformString(e.target.value.toLowerCase());
      if (searchString.length >= 3) {
          if (tagArrayselected.length != 0) {
              filterSearchBar = filterrecipes.filter((recipe) => {
                  return (uniformString(recipe.name).toLowerCase().includes(searchString) || uniformString(recipe.description).toLowerCase().includes(searchString) ||
                      recipe.ingredients.some((el) => uniformString(el.ingredient).includes(searchString)));
              });
              updatemedia(filterSearchBar);
              displayRecipes(filterSearchBar);
          }
          if (tagArrayselected.length === 0) {
              filterSearchBar = recipes.filter((recipe) => {
                  return (uniformString(recipe.name).toLowerCase().includes(searchString) || uniformString(recipe.description).toLowerCase().includes(searchString) ||
                      recipe.ingredients.some((el) => uniformString(el.ingredient).includes(searchString)));
              });
              updatemedia(filterSearchBar);
              displayRecipes(filterSearchBar);
              console.log(filterSearchBar);
            }
          if (filterSearchBar.length === 0) {
              recipesSection.innerHTML = `Aucune recette ne correspond à votre critère... Vous pouvez chercher  « tarte aux pommes », « poisson », etc.`;
          }
      }
      else {
          if (searchString.length < 3 && tagArrayselected.length != 0) {
            updatemedia(filterrecipes)
            displayRecipes(filterrecipes)
          } else if (searchString.length === 0 && tagArrayselected.length === 0) {
              updatemedia(recipes);
              displayRecipes(recipes);
          }
      }
  });
}

//Algo 1
// function searchMainBar() {
//   mainSearchinput.addEventListener('keyup', (e) => {
//       let filterSearchBar = [];
//       const searchString = uniformString(e.target.value.toLowerCase());
//       if (searchString.length >= 3) {
//           if (tagArrayselected.length === 0) {
//             for (let i = 0; i < recipes.length; i++) {
//                   const { name, ingredients, description } = recipes[i];
//                   const namerecipe = uniformString(name).toLowerCase().includes(searchString);
//                   const descriptionrecipe = uniformString(description).toLowerCase().includes(searchString);
//                   let ingredientrecipe = false;
//                   for (let y = 0; y < ingredients.length; y++) {
//                       if (uniformString(ingredients[y].ingredient).toLowerCase().includes(searchString)) {
//                           ingredientrecipe = true;
//                       }
//                   }
//                   if (namerecipe || descriptionrecipe || ingredientrecipe) {
//                       filterSearchBar.push(recipes[i]);
//                   } else {
//                       recipesSection.innerHTML = `Aucune recette ne correspond à votre critère... Vous pouvez chercher  « tarte aux pommes », « poisson », etc.`;
//                   }
//               }
//               updatemedia(filterSearchBar);
//               displayRecipes(filterSearchBar);
//           }
//           if (tagArrayselected.length != 0) {
//             for (let i = 0; i < filterrecipes.length; i++) {
//                   const { name, ingredients, description } = filterrecipes[i];
//                   const namerecipe = uniformString(name).toLowerCase().includes(searchString);
//                   const descriptionrecipe = uniformString(description).toLowerCase().includes(searchString);
//                   let ingredientrecipe = false;
//                   for (let y = 0; y < ingredients.length; y++) {
//                       if (uniformString(ingredients[y].ingredient).toLowerCase().includes(searchString)) {
//                           ingredientrecipe = true;
//                       }
//                   }
//                   if (namerecipe || descriptionrecipe || ingredientrecipe) {
//                       filterSearchBar.push(filterrecipes[i]);
//                   } else {
//                       recipesSection.innerHTML = `Aucune recette ne correspond à votre critère... Vous pouvez chercher  « tarte aux pommes », « poisson », etc.`;
//                   }
//               }
//               updatemedia(filterSearchBar);
//               displayRecipes(filterSearchBar);
//           }
//           if (filterSearchBar.length === 0) {
//               recipesSection.innerHTML = `Aucune recette ne correspond à votre critère... Vous pouvez chercher  « tarte aux pommes », « poisson », etc.`;
//           }
//       } else {
//         if (searchString.length < 3 && tagArrayselected.length != 0) {
//           updatemedia(filterrecipes)
//           displayRecipes(filterrecipes)
//         } else if (searchString.length === 0 && tagArrayselected.length === 0) {
//           updatemedia(recipes);
//           displayRecipes(recipes);
//         }
//       }
//   });
// }


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
  // searchItem();
  addTagIngredient();
  addTagappareil();
  addTagustensil();
  searchMainBar();
}
init();