import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExpensesListComponent } from './components/expenses-list/expenses-list.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'expenses', component:ExpensesListComponent},

];
