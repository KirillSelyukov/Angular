import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;
  constructor(private service: ShoppingListService) {
    this.ingredients = this.service.getIngredients();
  }

  ngOnInit() {
    this.subscription = this.service.ingredientsChanged.subscribe(
      (ingredints: Ingredient[]) => {
        this.ingredients = ingredints;
      },
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.service.addIngredient(ingredient);
  }
}
