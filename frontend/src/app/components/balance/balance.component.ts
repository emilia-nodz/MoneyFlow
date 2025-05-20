import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { IncomeService } from '../../services/income.service';
import { ExpenseService } from '../../services/expense.service';
import { Income } from '../../models/income';
import { Expense } from '../../models/expense';
import { forkJoin } from 'rxjs';
Chart.register(...registerables)

@Component({
  selector: 'app-balance',
  imports: [],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css'
})
export class BalanceComponent {
  incomes: Income[] = [];
  expenses: Expense[] = [];

  constructor(
    private incomeService: IncomeService,
    private expenseService: ExpenseService
  ) {
    this.loadDataAndRenderChart();
  }

  loadDataAndRenderChart(): void {
    forkJoin([
      this.incomeService.getAllIncomes(),
      this.expenseService.getAllExpenses()
    ]).subscribe(([incomes, expenses]) => {
      this.incomes = incomes.filter(income => income.date );
      this.expenses = expenses;
      this.renderBarChart();
    });
  }

  calculateTotal(transactions: Array<Income | Expense>): number {
    return transactions.reduce((total, transaction) => {
      const amount = typeof transaction.amount === 'string' ? parseFloat(transaction.amount) : transaction.amount;

      if (isNaN(amount)) {
        console.warn('Invalid amount found:', transaction.amount);
        return total;
      }
      
      return total + amount;
    }, 0);
  }

  renderBarChart(): void {
    const totalIncomes = this.calculateTotal(this.incomes);
    const totalExpenses = this.calculateTotal(this.expenses);
    const balance = totalIncomes - totalExpenses;

    const chart = new Chart("barchart", {
      type: 'bar',
      data: {
        labels: ['Incomes', 'Expenses', 'Balance'],
        datasets: [{
          label: 'Amount',
          data: [totalIncomes, totalExpenses, balance],
          backgroundColor: [
            '#198754',  
            '#DC3545',
            '#0DCAF0'
          ]
        }
      ]
      }
    });
  }

  
}
