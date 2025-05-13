import { Component } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-expenses-list',
  imports: [CommonModule],
  templateUrl: './expenses-list.component.html',
  styleUrl: './expenses-list.component.css'
})
export class ExpensesListComponent{
  expenses: Expense[] = [];
  categories: Category[] = [];

  constructor(
    private expensesService: ExpenseService,
    private categoryService: CategoryService
  ) {
    this.expensesService.getAllExpenses().subscribe(data => {
      this.expenses = data;
    });


    // TO-DO: now it gets all categories, make it so that, only each expenses category is shown
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }
   

}
