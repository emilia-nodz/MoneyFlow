import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/category';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = environment.apiUrl + "category";

  constructor(private httpClient: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error getting categories:', error);
        return throwError(() => new Error('Error getting categories'));
      })
    );;
  }

  insertCategory(category: Category): Observable<Category> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.httpClient.post<Category>(this.apiUrl+"/", category, httpOptions).pipe(
      catchError(error => {
        console.error('Error adding category:', error);
        return throwError(() => new Error('Error adding category'));
      })
    );
  }

  deleteCategory(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}/`).pipe(
      catchError(error => {
        console.error('Error removing category:', error);
        return throwError(() => new Error('Error removing category'));
      })
    );
  }

  updateCategory(category: Category): Observable<Category> {
    return this.httpClient.patch<Category>(`${this.apiUrl}/${category.id}/`, category).pipe(
      catchError(error => {
        console.error('Error updating category:', error);
        return throwError(() => new Error('Error updating category'));
      })
    );
  }

}
