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
import { ExpenseFormComponent } from "../expense-form/expense-form.component";

@Component({
  selector: 'app-dialog-edit-form',
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ExpenseFormComponent
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-edit-form.component.html',
  styleUrl: './dialog-edit-form.component.css'
})
export class DialogEditFormComponent {
  readonly dialogRef = inject(MatDialogRef<DialogEditFormComponent>);
  transactionToEdit: boolean | undefined;
  readonly expenseData = inject<Expense>(MAT_DIALOG_DATA);
  readonly incomeData = inject<Income>(MAT_DIALOG_DATA);

  constructor(
    private expenseService: ExpenseService,
    private incomeService: IncomeService
  ) {
    console.log('Dialog received data:', this.expenseData);
    this.chooseTransactionToEdit();
  }
  
  chooseTransactionToEdit(): void {
    if(this.expenseData) {
      console.log(this.expenseData.id)
      this.transactionToEdit = true;
    } else {
      this.transactionToEdit = false;
    };
  }
}
