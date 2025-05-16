import { Component, inject } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import {MatTabsModule} from '@angular/material/tabs';
import { ExpenseFormComponent } from "../expense-form/expense-form.component";
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from '../dialog/dialog.component';
import { Income } from '../../models/income';
import { DialogEditFormComponent } from '../dialog-edit-form/dialog-edit-form.component';

@Component({
  selector: 'app-expenses-list',
  imports: [CommonModule, MatTabsModule, ExpenseFormComponent, MatIconModule, MatButtonModule],
  templateUrl: './expenses-list.component.html',
  styleUrl: './expenses-list.component.css'
})
export class ExpensesListComponent{
  readonly dialog = inject(MatDialog);
  expenses: Expense[] = [];
  categories: Category[] = [];
  category_name: String = "";

  constructor(
    private expensesService: ExpenseService,
    private categoryService: CategoryService
  ) {
    this.expensesService.getAllExpenses().subscribe(data => {
      this.expenses = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
    
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }
     
  currentExpenseCategory(expense: Expense): boolean {
    if (!expense.category) {
      return false;
    }

    let found = this.categories.find(cat => String(cat.id) === String(expense.category!.id));
    if (found) {
      let name = found.name;
      this.category_name = name[0].toUpperCase() + name.slice(1);
    }

    return true;
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, toDelete: Expense | Income): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: toDelete
    });
  }

  openDialogToEdit(enterAnimationDuration: string, exitAnimationDuration: string, toEdit: Expense | Income): void {
    this.dialog.open(DialogEditFormComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: toEdit
    });

  }

}
