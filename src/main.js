import { recipes } from "../data/recipes.js";
import { Recipes } from "./recipes.js";

/**
 * Display all recipes when the page loads
 */
export class HomePage {
  static initHomePage() {
    recipes.forEach((recipe) => {
      console.log(recipe);
      new Recipes(recipe);
    });
  }
}

/**
 * loading home page
 */
window.onload = HomePage.initHomePage();