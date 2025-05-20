import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { IncomeService } from '../../services/income.service';
import { ExpenseService } from '../../services/expense.service';
import { Income } from '../../models/income';
import { Expense } from '../../models/expense';
import { forkJoin } from 'rxjs';
Chart.register(...registerables)

@Component({
  selector: 'app-charts',
  imports: [],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent {
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
      this.renderPieChart();
      this.renderCategoryChart();
      this.renderSourceChart();
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

    const chart = new Chart("barChart", {
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

  renderPieChart(): void {
    const totalIncomes = this.calculateTotal(this.incomes);
    const totalExpenses = this.calculateTotal(this.expenses);
    const balance = totalIncomes - totalExpenses;

    const chart = new Chart("pieChart", {
      type: 'pie',
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

  renderCategoryChart(): void {
    const categoryMap = new Map<string, number>();
    
    this.expenses.forEach(expense => {
      const categoryName = expense.category?.name || 'Uncategorized';
      const amount = typeof expense.amount === 'string' ? parseFloat(expense.amount) : expense.amount;
      
      if (isNaN(amount)) {
        return;
      }

      const current = categoryMap.get(categoryName) || 0;
      categoryMap.set(categoryName, current + amount);
    });
  
    const labels = Array.from(categoryMap.keys());
    const data = Array.from(categoryMap.values());
    const backgroundColors = this.generateCategoryColors(labels.length);
  
    const chart = new Chart('categoryPieChart', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Expenses by Category',
          data: data,
          backgroundColor: backgroundColors,
          borderWidth: 1
        }]
      }
    });
  }

  renderSourceChart(): void {
    const sourceMap = new Map<string, number>();
    
    this.incomes.forEach(income => {
      const sourceName = income.source?.name || 'Uncategorized';
      const amount = typeof income.amount === 'string' ? parseFloat(income.amount) : income.amount;
      
      if (isNaN(amount)) {
        return;
      }
      
      const current = sourceMap.get(sourceName) || 0;
      sourceMap.set(sourceName, current + amount);
    });
  
    const labels = Array.from(sourceMap.keys());
    const data = Array.from(sourceMap.values());
    const backgroundColors = this.generateCategoryColors(labels.length);
  
    const chart = new Chart('sourcePieChart', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Incomes by Sources',
          data: data,
          backgroundColor: backgroundColors,
          borderWidth: 1
        }]
      }
    });
  }

  private generateCategoryColors(count: number): string[] {
    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', 
      '#FF9F40', '#8AC24A', '#FF5722', '#607D8B', '#E91E63',
      '#3F51B5', '#009688', '#795548', '#9C27B0', '#CDDC39'
    ];
    
    return Array.from({length: count}, (_, i) => colors[i % colors.length]);
  }

  
}
