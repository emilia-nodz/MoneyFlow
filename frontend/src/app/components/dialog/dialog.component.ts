import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Expense } from '../../models/expense';
import { Income } from '../../models/income';
import { ExpenseService } from '../../services/expense.service';
import { IncomeService } from '../../services/income.service';


@Component({
  selector: 'app-dialog',
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA) as Expense | Income;

  constructor(
    private expenseService: ExpenseService,
    private incomeService: IncomeService
  ) {}
  
  isExpense(transaction: Expense | Income): transaction is Expense {
    return 'category' in transaction;
  }

  deleteTransaction(): void {
    console.log(this.data)
    if(this.isExpense(this.data)) {
      this.expenseService.deleteExpense(this.data).subscribe();
    } else  {
      this.incomeService.deleteIncome(this.data).subscribe();
    } 
    location.reload();
  }

}
