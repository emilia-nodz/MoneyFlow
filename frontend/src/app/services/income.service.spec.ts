import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { IncomeService } from './income.service';
import { Income } from '../models/income';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

describe('IncomeService', () => {
  let service: IncomeService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideHttpClient(),
        provideHttpClientTesting()]
    });
    
    service = TestBed.inject(IncomeService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  const apiUrl = environment.apiUrl;

  const initialData: Income[] = [
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

  const incomeId = 1;

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get incomes', () => {
    service.getAllIncomes().subscribe(incomes => {
      expect(incomes.length).toBeGreaterThan(0);
    });
    const apiReq = httpTesting.expectOne(apiUrl + 'income');
    expect(apiReq.request.method).toBe("GET");
    apiReq.flush(initialData);
  });

  it('should get income by id', () => {
    service.getIncomeById(incomeId).subscribe(income => {
      expect(income.id).toEqual(initialData[0].id);
    });
    const apiReq = httpTesting.expectOne(apiUrl + 'income/1/');
    expect(apiReq.request.method).toBe("GET");
    apiReq.flush(initialData[0]);
  });

  it('should insert an income', () => {
    service.insertIncome({
      id:3,
      amount: 3999.79,
      date: new Date,
      description: 'Paycheck finally!!',
      category_id: 2
    }).subscribe(income => {
      expect(income).toBeTruthy();
      expect(income.amount).toBe(3999.79);
      expect(income.description).toBe('Paycheck finally!!');
      expect(income.category_id).toBe(2);
    });
    const apiReq = httpTesting.expectOne(apiUrl + "income/");
    expect(apiReq.request.method).toBe("POST");
    expect(apiReq.request.body.amount).toBe(3999.79);
    expect(apiReq.request.body.description).toBe('Paycheck finally!!');
    expect(apiReq.request.body.category_id).toBe(2);

    apiReq.flush({
      id:3,
      amount: 3999.79,
      date: new Date,
      description: 'Paycheck finally!!',
      category_id: 2
    });
  });

  it('should update delete income by id', () => {
    service.deleteIncome(incomeId).subscribe(income => {
      expect(income).toBeNull();
    });
    const apiReq = httpTesting.expectOne(apiUrl + "income/" + incomeId + "/");
    expect(apiReq.request.method).toBe("DELETE");
    apiReq.flush(null);
  });

  it('should update existing income by id', () => {
    service.updateIncome({
      id: 1,
      amount: 300.00,
      date: new Date,
      description: 'two hundred',
      category_id: 5
    }).subscribe(income => {
      expect(income).toBeTruthy();
      expect(income.amount).toBe(300.00);
      expect(income.category_id).toEqual(5);
    });
    const apiReq = httpTesting.expectOne(apiUrl + "income/" + incomeId + "/");
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
