import { Component, inject } from '@angular/core';
import { IncomeService } from '../../services/income.service';
import { Income } from '../../models/income';
import { CommonModule } from '@angular/common';
import { Source } from '../../models/source';
import { SourceService } from '../../services/source.service';
import {MatTabsModule} from '@angular/material/tabs';
import { IncomeFormComponent } from "../income-form/income-form.component";
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogEditFormComponent } from '../dialog-edit-form/dialog-edit-form.component';
import { Expense } from '../../models/expense';

@Component({
  selector: 'app-incomes-list',
  imports: [CommonModule, MatTabsModule, IncomeFormComponent, MatIconModule, MatButtonModule],
  templateUrl: './incomes-list.component.html',
  styleUrl: './incomes-list.component.css'
})
export class IncomesListComponent{
  readonly dialog = inject(MatDialog);
  incomes: Income[] = [];
  sources: Source[] = [];
  source_name: String = "";

  constructor(
    private incomesService: IncomeService,
    private sourceService: SourceService
  ) {
    this.incomesService.getAllIncomes().subscribe(data => {
      this.incomes = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
    
    this.sourceService.getAllSources().subscribe(data => {
      this.sources = data;
    });
  }
     
  currentIncomeSource(income: Income): boolean {
    if (!income.source) {
      return false;
    }

    let found = this.sources.find(source => String(source.id) === String(income.source!.id));
    if (found) {
      let name = found.name;
      this.source_name = name[0].toUpperCase() + name.slice(1);
    }

    return true;
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, toDelete: Expense | Income): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: toDelete
    });
  }

  openDialogToEdit(enterAnimationDuration: string, exitAnimationDuration: string, toEdit: Expense | Income): void {
    console.log(toEdit);
    this.dialog.open(DialogEditFormComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: toEdit
    });

  }

}
