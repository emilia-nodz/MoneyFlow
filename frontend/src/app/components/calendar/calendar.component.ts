import { Component } from '@angular/core';
import {ChangeDetectionStrategy, model} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { IncomeService } from '../../services/income.service';
import { ExpenseService } from '../../services/expense.service';
import { Income } from '../../models/income';
import moment from 'moment';
import { Expense } from '../../models/expense';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatDatepickerModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CalendarComponent {
  selected = model<Date | null>(null);
  incomes: Income[] = [];
  expenses: Expense[] = [];
  incomesOnDate: Income[] = [];
  expensesOnDate: Expense[] = [];
  incomesLength: number = 0;
  expensesLength: number = 0;

  constructor (
    private incomeService: IncomeService,
    private expenseService: ExpenseService
  ) {
    this.incomeService.getAllIncomes().subscribe( incomes => {
      this.incomes = incomes;
    });
    this.expenseService.getAllExpenses().subscribe( expenses => {
      this.expenses = expenses;
    });
  }

  getTransactionByDate(): void {
    let selectedDate = this.selected();

    this.incomesOnDate = this.incomes.filter(income => moment(income.date).isSame(selectedDate, 'day'));
    this.incomesLength = this.incomesOnDate.length;

    this.expensesOnDate = this.expenses.filter(expense => moment(expense.date).isSame(selectedDate, 'day'));
    this.expensesLength = this.expensesOnDate.length;

  }
}
