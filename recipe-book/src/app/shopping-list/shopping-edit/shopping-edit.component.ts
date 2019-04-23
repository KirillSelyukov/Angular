import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private service: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.service.startingEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.service.getIngredient(index);
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      },
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onAddItem({ value }: NgForm) {
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.service.updateIngredient(this.editedItemIndex, newIngredient);
      this.editMode = false;
    } else {
      this.service.addIngredient(newIngredient);
    }
    this.form.reset();
  }

  clearFrom() {
    this.form.reset();
    this.editMode = false;
  }
  deleteIngredient() {
    if (this.editMode) {
      this.service.deleteIngredient(this.editedItemIndex);
    }
    this.clearFrom();
  }
}
