import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Route } from '@angular/compiler/src/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  constructor(private slService: ShoppingListService) {}

  ngOnInit() {}

  add() {
    this.slService.addIngredients(this.recipe.ingredients);
    this.slService.ingredientsChanged.subscribe((ingredients: Ingredient[]) =>
      console.log(ingredients),
    );
  }
}
