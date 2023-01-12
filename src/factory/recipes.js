function recipesFactory(data) {
  const { id, name, servings, ingredients, time, description, appliance, ustensils } = data;


  function getRecipesDOM() {
      const article = document.createElement('article');
      article.setAttribute('class', 'recipes');
      article.setAttribute('id', `${id}`);
      article.setAttribute('data-appliance', `${appliance}`);
      article.setAttribute('data-ustensils', `${ustensils}`);
      article.setAttribute('data-servings', `${servings}`);
      article.setAttribute('tabindex', '0');

      article.innerHTML = `
                <div class="recipe-img"></div>
              <div class="recipe-détails">
                  <div class="recipe-head-text">
                      <h2>${name}</h2>
                      <span class="timer"><i class="far fa-clock"></i> ${time
          } min</span>
                  </div>
                  <div class="container-details">
                      <ul class="recipes-ingredients ">
                      ${ingredients.map((ingredient) => `<li>${ingredient.ingredient}: ${"quantity" in ingredient ? ingredient.quantity : ""}
                      ${"unit" in ingredient ? ingredient.unit : ""}`)}</li>
                      </ul>
                      <p class="recipes-description">${description.substring(
              0,
              180
          )}${description.length > 180 ? "..." : ""
          }</p>
                  </div>
              </div>
      `;




      return (article);

  }
  return { data, getRecipesDOM };
}
