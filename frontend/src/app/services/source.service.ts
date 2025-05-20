import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Source } from '../models/source';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  private apiUrl = "http://localhost:8000/source/";

  constructor(private httpClient: HttpClient) { }

  getAllSources(): Observable<Source[]> {
    return this.httpClient.get<Source[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error getting sources:', error);
        return throwError(() => new Error('Error getting sources'));
      })
    );;
  }

  insertSource(source: Source): Observable<Source> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.httpClient.post<Source>(this.apiUrl, source, httpOptions).pipe(
      catchError(error => {
        console.error('Error adding source:', error);
        return throwError(() => new Error('Error adding source'));
      })
    );
  }

  deleteSource(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}${id}/`).pipe(
      catchError(error => {
        console.error('Error removing source:', error);
        return throwError(() => new Error('Error removing source'));
      })
    );
  }

  updateSource(source: Source): Observable<Source> {
    return this.httpClient.patch<Source>(`${this.apiUrl}${source.id}/`, source).pipe(
      catchError(error => {
        console.error('Error updating source:', error);
        return throwError(() => new Error('Error updating source'));
      })
    );
  }

}
