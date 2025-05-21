import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExpensesListComponent } from './components/expenses-list/expenses-list.component';
import { IncomesListComponent } from './components/incomes-list/incomes-list.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { CalendarComponent } from './components/calendar/calendar.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'expenses', component:ExpensesListComponent},
    {path: 'incomes', component:IncomesListComponent},
    {path: 'statistics', component:StatisticsComponent},
    {path: 'calendar', component:CalendarComponent},

];
