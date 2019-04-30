import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    return this.http.put(
      'https://recipe-book-a6317.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(),
    );
  }

  getRecipe() {
    this.http
      .get<Recipe[]>('https://recipe-book-a6317.firebaseio.com/recipes.json')
      .subscribe(recipes => {
        console.log(recipes);
        this.recipeService.setRecipes(recipes);
      });
  }
}
