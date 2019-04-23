import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private service: RecipeService) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    console.log(this.form);
  }

  getControls() {
    const result = (<FormArray>this.form.get('ingredients')).controls;
    return result;
  }

  private initForm() {
    let name = '';
    let imgPath = '';
    let description = '';
    const ingredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.service.getRecipe(this.id);
      name = recipe.name;
      imgPath = recipe.imagePath;
      description = recipe.description;
      if (recipe['ingredients']) {
        for (const ingredient of recipe.ingredients) {
          ingredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name),
              amount: new FormControl(ingredient.amount),
            }),
          );
        }
      }
    }
    this.form = new FormGroup({
      name: new FormControl(name),
      imagePath: new FormControl(imgPath),
      description: new FormControl(description),
      ingredients: ingredients,
    });
  }
}
