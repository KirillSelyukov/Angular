import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: RecipeService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.form.value['name'],
    //   this.form.value['imagePath'],
    //   this.form.value['description'],
    //   this.form.value['ingredients'],
    // );
    if (this.editMode) {
      this.service.updateRecipe(this.id, this.form.value);
    } else {
      this.service.addRecipe(this.form.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  getControls() {
    const result = (<FormArray>this.form.get('ingredients')).controls;
    return result;
  }
  onAddIngredient() {
    (<FormArray>this.form.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      }),
    );
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
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            }),
          );
        }
      }
    }
    this.form = new FormGroup({
      name: new FormControl(name, Validators.required),
      imagePath: new FormControl(imgPath, Validators.required),
      description: new FormControl(description),
      ingredients: ingredients,
    });
  }
}
