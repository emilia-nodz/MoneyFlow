import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormBuilder,FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IncomeService } from '../../services/income.service';
import { SourceService } from '../../services/source.service';
import { Source } from '../../models/source';
import { Income } from '../../models/income';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income-form',
  providers: [provideNativeDateAdapter()],
  imports: [ MatInputModule, MatSelectModule, MatDatepickerModule, CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './income-form.component.html',
  styleUrl: './income-form.component.css'
})
export class IncomeFormComponent implements OnChanges{
  formModel: FormGroup;
  sources: Source[] = [];
  incomes: Income[] = [];
  successfullyAdded: boolean = false;
  action: string = "";

  @Input() index: number | undefined;
  
  constructor (
    private formBuilder: FormBuilder, 
    private incomeService: IncomeService,
    private sourceService: SourceService
  ) {
    this.sourceService.getAllSources().subscribe(data => { 
      this.sources = data
    });

    this.incomeService.getAllIncomes().subscribe(data => {
      this.incomes = data
    });

    this.formModel = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(Number.MIN_VALUE)]],
      date: [new Date(), Validators.required] ,
      source:['',Validators.required],
      description: ['', Validators.required]
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['index'] && this.index !== undefined) {
      this.incomeService.getIncomeById(this.index).subscribe(income => {
        this.formModel.patchValue(income);
      });
    }
  }

  addIncome(source_id: number, amount: number, date: Date, description: string): void {
    const newIncome: Income = {source_id, amount, date, description} as Income;
    this.incomeService.insertIncome(newIncome).subscribe(() => {
      this.successfullyAdded = true;
      this.action = "added";
    });
  }

  editIncome(source_id: number, amount: number, date: Date, description: string): void {
    const editedIncome: Income = {id: this.index,source_id, amount, date, description} as Income;
    this.incomeService.updateIncome(editedIncome).subscribe(() => {
      this.successfullyAdded = true;
      this.action = "updated";
      location.reload();
    })
  }

  submitForm(): void {
    if(this.index) {
      this.editIncome(
        this.formModel.value.source,
        this.formModel.value.amount,
        this.formModel.value.date,
        this.formModel.value.description
      );
    } else {
      this.addIncome(
        this.formModel.value.source,
        this.formModel.value.amount,
        this.formModel.value.date,
        this.formModel.value.description
      );
    }
  }
}
