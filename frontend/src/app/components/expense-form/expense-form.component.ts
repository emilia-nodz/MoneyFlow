import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormBuilder,FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { Expense } from '../../models/expense';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-form',
  providers: [provideNativeDateAdapter()],
  imports: [ MatInputModule, MatSelectModule, MatDatepickerModule, CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent implements OnChanges{
  formModel: FormGroup;
  categories: Category[] = [];
  expenses: Expense[] = [];
  successfullyAdded: boolean = false;
  action: string = "";

  @Input() index: number | undefined;
  
  constructor (
    private formBuilder: FormBuilder, 
    private expenseService: ExpenseService,
    private categoryService: CategoryService
  ) {
    this.categoryService.getAllCategories().subscribe(data => { 
      this.categories = data
    });

    this.expenseService.getAllExpenses().subscribe(data => {
      this.expenses = data
    });

    this.formModel = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(Number.MIN_VALUE)]],
      date: [new Date(), Validators.required] ,
      category:['',Validators.required],
      description: ['', Validators.required]
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['index'] && this.index !== undefined) {
      this.expenseService.getExpenseById(this.index).subscribe(expense => {
        this.formModel.patchValue(expense);
      });
    }
  }

  addExpense(category_id: number, amount: number, date: Date, description: string): void {
    const newExpense: Expense = {category_id, amount, date, description} as Expense;
    this.expenseService.insertExpense(newExpense).subscribe(() => {
      this.successfullyAdded = true;
      this.action = "added";
    });
  }

  editExpense(category_id: number, amount: number, date: Date, description: string): void {
    const editedExpense: Expense = {id: this.index,category_id, amount, date, description} as Expense;
    this.expenseService.updateExpense(editedExpense).subscribe(() => {
      this.successfullyAdded = true;
      this.action = "updated";
      location.reload();
    })
  }

  submitForm(): void {
    if(this.index) {
      this.editExpense(
        this.formModel.value.category,
        this.formModel.value.amount,
        this.formModel.value.date,
        this.formModel.value.description
      );
    } else {
      this.addExpense(
        this.formModel.value.category,
        this.formModel.value.amount,
        this.formModel.value.date,
        this.formModel.value.description
      );
    }
  }
}
