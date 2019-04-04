import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  constructor(private service: ShoppingListService) {
    this.ingredients = this.service.getIngredients();
  }

  ngOnInit() {
    this.service.ingredientsChanged.subscribe((ingredints: Ingredient[]) => {
      this.ingredients = ingredints;
    });
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.service.addIngredient(ingredient);
  }
}
