import { Component } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-expenses-list',
  imports: [CommonModule, MatTabsModule],
  templateUrl: './expenses-list.component.html',
  styleUrl: './expenses-list.component.css'
})
export class ExpensesListComponent{
  expenses: Expense[] = [];
  categories: Category[] = [];
  category_name: String = "";

  constructor(
    private expensesService: ExpenseService,
    private categoryService: CategoryService
  ) {
    this.expensesService.getAllExpenses().subscribe(data => {
      this.expenses = data;
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

}
