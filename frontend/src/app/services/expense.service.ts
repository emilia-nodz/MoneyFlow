import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Expense } from '../models/expense';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = environment.apiUrl + "expense";

  constructor(private httpClient: HttpClient) { }

  getAllExpenses(): Observable<Expense[]> {
    return this.httpClient.get<Expense[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error getting expenses:', error);
        return throwError(() => new Error('Error getting expenses'));
      })
    );;
  }

  getExpenseById(id: number): Observable<Expense> {
    return this.httpClient.get<Expense>(`${this.apiUrl}/${id}/`).pipe(
      catchError(error => {
        console.error('Error getting expense:', error);
        return throwError(() => new Error('Error getting expenses'));
      })
    );;
  }


  insertExpense(expense: Expense): Observable<Expense> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.httpClient.post<Expense>(this.apiUrl+"/", expense, httpOptions).pipe(
      catchError(error => {
        console.error('Error adding expense:', error);
        return throwError(() => new Error('Error adding expense'));
      })
    );
  }

  deleteExpense(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}/`).pipe(
      catchError(error => {
        console.error('Error removing expense:', error);
        return throwError(() => new Error('Error removing expense'));
      })
    );
  }

  updateExpense(expense: Expense): Observable<Expense> {
    return this.httpClient.patch<Expense>(`${this.apiUrl}/${expense.id}/`, expense).pipe(
      catchError(error => {
        console.error('Error updating expense:', error);
        return throwError(() => new Error('Error updating expense'));
      })
    );
  }
}
