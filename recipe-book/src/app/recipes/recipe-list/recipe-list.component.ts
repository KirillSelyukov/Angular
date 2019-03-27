import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'Image', 'https://cdn-image.foodandwine.com/sites/default/files/styles/medium_2x/public/fusilli-salad-with-grilled-chicken-and-zucchini-xl-200308.jpg?itok=FzuPP-Os'),
    new Recipe('another test recipe', 'Image', 'https://cdn-image.foodandwine.com/sites/default/files/styles/medium_2x/public/fusilli-salad-with-grilled-chicken-and-zucchini-xl-200308.jpg?itok=FzuPP-Os')
  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
