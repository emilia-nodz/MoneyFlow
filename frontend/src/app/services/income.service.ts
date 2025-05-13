import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Income } from '../models/income';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  private apiUrl = environment.apiUrl + "income";

  constructor(private httpClient: HttpClient) { }

  getAllIncomes(): Observable<Income[]> {
    return this.httpClient.get<Income[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error getting incomes:', error);
        return throwError(() => new Error('Error getting incomes'));
      })
    );;
  }

  getIncomeById(id: number): Observable<Income> {
    return this.httpClient.get<Income>(`${this.apiUrl}/${id}/`).pipe(
      catchError(error => {
        console.error('Error getting income:', error);
        return throwError(() => new Error('Error getting income'));
      })
    );;
  }


  insertIncome(income: Income): Observable<Income> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.httpClient.post<Income>(this.apiUrl+"/", income, httpOptions).pipe(
      catchError(error => {
        console.error('Error adding income:', error);
        return throwError(() => new Error('Error adding income'));
      })
    );
  }

  deleteIncome(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}/`).pipe(
      catchError(error => {
        console.error('Error removing income:', error);
        return throwError(() => new Error('Error removing income'));
      })
    );
  }

  updateIncome(income: Income): Observable<Income> {
    return this.httpClient.patch<Income>(`${this.apiUrl}/${income.id}/`, income).pipe(
      catchError(error => {
        console.error('Error updating income:', error);
        return throwError(() => new Error('Error updating income'));
      })
    );
  }
}
