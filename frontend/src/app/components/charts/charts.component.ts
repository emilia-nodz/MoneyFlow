import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { IncomeService } from '../../services/income.service';
import { ExpenseService } from '../../services/expense.service';
import { Income } from '../../models/income';
import { Expense } from '../../models/expense';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
Chart.register(...registerables)

@Component({
  selector: 'app-charts',
  imports: [CommonModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent {
  incomes: Income[] = [];
  expenses: Expense[] = [];
  balance: number = 0;
  totalIncomes: number = 0;
  totalExpenses: number = 0;

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

  initializeValues(): void {
    this.totalIncomes = this.calculateTotal(this.incomes);
    this.totalExpenses = this.calculateTotal(this.expenses);
    this.balance = this.totalIncomes - this.totalExpenses;
  }

  renderBarChart(): void {
    this.initializeValues();

    const chart = new Chart("barChart", {
      type: 'bar',
      data: {
        labels: ['Incomes', 'Expenses', 'Balance'],
        datasets: [{
          label: 'Amount',
          data: [this.totalIncomes, this.totalExpenses, this.balance],
          backgroundColor: [
            '#479F76',  
            '#E35D6A',
            '#3D8BFD'
          ]
        }
      ]},
      options: {
        responsive: true
      }
    });
  }

  renderPieChart(): void {    
    const chart = new Chart("pieChart", {
      type: 'pie',
      data: {
        labels: ['Incomes', 'Expenses', 'Balance'],
        datasets: [{
          label: 'Amount',
          data: [this.totalIncomes, this.totalExpenses, this.balance],
          backgroundColor: [
            '#479F76',  
            '#E35D6A',
            '#3D8BFD'
          ]
        }
      ]},
      options: {
        responsive: true,
        maintainAspectRatio: false, // Crucial for custom sizing
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
    const backgroundColors = this.generateSourceColors(labels.length);
  
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

  generateCategoryColors(count: number): string[] {
    const colors = [
      '#9EC5FE', '#A98EDA', '#E685B5', '#EA868F', '#FEB272', 
      '#212529', '#6610F2', '#6F42C1', '#EFADCE', '#DC3545',
      '#FD7E14', '#FFC107'
    ];
    
    return Array.from({length: count}, (_, i) => colors[i % colors.length]);
  }

  generateSourceColors(count: number): string[] {
    const colors = [
      '#BAC981', '#75B798', '#79DFC1', '#6EDFF6','#198754', '#20C997', '#0DCAF0', 
      '#0F5132', '#13795B','#087990' 
    ];
    
    return Array.from({length: count}, (_, i) => colors[i % colors.length]);
  }

}
