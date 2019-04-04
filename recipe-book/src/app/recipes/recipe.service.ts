import { EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';

export class RecipeService {
  recipeWasSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'Image',
      'https://cdn-image.foodandwine.com/sites/default/files/styles/medium_2x/public/fusilli-salad-with-grilled-chicken-and-zucchini-xl-200308.jpg?itok=FzuPP-Os',
    ),
    new Recipe(
      'another test recipe',
      'Image',
      'https://cdn-image.foodandwine.com/sites/default/files/styles/medium_2x/public/fusilli-salad-with-grilled-chicken-and-zucchini-xl-200308.jpg?itok=FzuPP-Os',
    ),
  ];
  getRecipes() {
    return this.recipes.slice();
  }
}
