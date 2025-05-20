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
import { ExpenseFormComponent } from "../expense-form/expense-form.component";
import { IncomeFormComponent } from "../income-form/income-form.component";


@Component({
  selector: 'app-dialog-edit-form',
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ExpenseFormComponent,
    IncomeFormComponent
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-edit-form.component.html',
  styleUrl: './dialog-edit-form.component.css'
})
export class DialogEditFormComponent {
  readonly dialogRef = inject(MatDialogRef<DialogEditFormComponent>);
  transactionToEdit: boolean | undefined;
  readonly data = inject(MAT_DIALOG_DATA) as Expense | Income;


  constructor(
  ) {
    console.log('Dialog received data:', this.data);
    this.chooseTransactionToEdit();
  }
  
  isExpense(transaction: Expense | Income): transaction is Expense {
    return 'category' in transaction;
  }
  
  chooseTransactionToEdit(): void {
    console.log(this.data)
    if(this.isExpense(this.data)) {
      this.transactionToEdit = true;
    } else {
      this.transactionToEdit = false;
    };
  }
}
