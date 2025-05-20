import { TestBed } from '@angular/core/testing';

import { ExpenseService } from './expense.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Expense } from '../models/expense';

describe('ExpenseService', () => {
  let service: ExpenseService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideHttpClient(),
        provideHttpClientTesting()]
    });
    
    service = TestBed.inject(ExpenseService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  const apiUrl = "http://localhost:8000/"

  const initialData: Expense[] = [
        {
          id: 1,

          amount: 200.00,
          date: new Date,
          description: 'two hundred',
          category_id: 1
        },
        {
          id: 2,
          amount: 5.00,
          date: new Date,
          description: 'five'
        }
      ];

  const expenseId = 1;

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get expenses', () => {
    service.getAllExpenses().subscribe(expenses => {
      expect(expenses.length).toBeGreaterThan(0);
    });
    const apiReq = httpTesting.expectOne(apiUrl + 'expense/');
    expect(apiReq.request.method).toBe("GET");
    apiReq.flush(initialData);
  });

  it('should get expense by id', () => {
    service.getExpenseById(expenseId).subscribe(expense => {
      expect(expense.id).toEqual(initialData[0].id);
    });
    const apiReq = httpTesting.expectOne(apiUrl + 'expense/1/');
    expect(apiReq.request.method).toBe("GET");
    apiReq.flush(initialData[0]);
  });

  it('should insert an expense', () => {
    service.insertExpense({
      id:3,
      amount: 15.00,
      date: new Date,
      description: '',
      category_id: 2
    }).subscribe(expense => {
      expect(expense).toBeTruthy();
      expect(expense.amount).toBe(15.00);
      expect(expense.description).toBe('');
      expect(expense.category_id).toBe(2);
    });
    const apiReq = httpTesting.expectOne(apiUrl + "expense/");
    expect(apiReq.request.method).toBe("POST");
    expect(apiReq.request.body.amount).toBe(15.00);
    expect(apiReq.request.body.description).toBe('');
    expect(apiReq.request.body.category_id).toBe(2);

    apiReq.flush({
      id:3,
      amount: 15.00,
      date: new Date,
      description: '',
      category_id: 2
    });
  });

  it('should delete expense by id', () => {
    service.deleteExpense(initialData[0]).subscribe(expense => {
      expect(expense).toBeNull();
    });
    const apiReq = httpTesting.expectOne(apiUrl + "expense/" + initialData[0].id + "/");
    expect(apiReq.request.method).toBe("DELETE");
    apiReq.flush(null);
  });

  it('should update existing expense by id', () => {
    service.updateExpense({
      id: 1,
      amount: 300.00,
      date: new Date,
      description: 'two hundred',
      category_id: 5
    }).subscribe(expense => {
      expect(expense).toBeTruthy();
      expect(expense.amount).toBe(300.00);
      expect(expense.category_id).toEqual(5);
    });
    const apiReq = httpTesting.expectOne(apiUrl + "expense/" + expenseId + "/");
    expect(apiReq.request.method).toBe("PATCH");
    expect(apiReq.request.body.amount).toBe(300.00);
    expect(apiReq.request.body.category_id).toEqual(5);
    apiReq.flush({
      id: 1,
      amount: 300.00,
      date: new Date,
      description: 'two hundred',
      category_id: 5
    });
  });
});
