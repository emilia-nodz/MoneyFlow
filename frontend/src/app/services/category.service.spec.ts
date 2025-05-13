import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Category } from '../models/category';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideHttpClient(),
        provideHttpClientTesting()]
    });
    
    service = TestBed.inject(CategoryService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  const apiUrl = environment.apiUrl;

  const initialData: Category[] = [
        {
          id: 1,
          name: "food"
        },
        {
          id: 2,
          name: "clothes"
        }
      ];

  const categoryId = 1;

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get categories', () => {
    service.getAllCategories().subscribe(categories => {
      expect(categories.length).toBeGreaterThan(0);
    });
    const apiReq = httpTesting.expectOne(apiUrl + 'category');
    expect(apiReq.request.method).toBe("GET");
    apiReq.flush(initialData);
  });

  it('should insert a category', () => {
    service.insertCategory({
      id:3,
      name: "work"
    }).subscribe(category => {
      expect(category).toBeTruthy();
      expect(category.name).toBe("work");
    });
    const apiReq = httpTesting.expectOne(apiUrl + "category/");
    expect(apiReq.request.method).toBe("POST");
    expect(apiReq.request.body.name).toBe("work");
    apiReq.flush({
      id:3,
      name: "work"
    });
  });

  it('should update delete category by id', () => {
    service.deleteCategory(categoryId).subscribe(category => {
      expect(category).toBeNull();
    });
    const apiReq = httpTesting.expectOne(apiUrl + "category/" + categoryId + "/");
    expect(apiReq.request.method).toBe("DELETE");
    apiReq.flush(null);
  });

  it('should update existing category by id', () => {
    service.updateCategory({
      id: 1,
      name: "transport"
    }).subscribe(category => {
      expect(category).toBeTruthy();
      expect(category.name).toBe("transport");
    });
    const apiReq = httpTesting.expectOne(apiUrl + "category/" + categoryId + "/");
    expect(apiReq.request.method).toBe("PATCH");
    expect(apiReq.request.body.name).toBe("transport");
    apiReq.flush({
      id: 1,
      name: "transport"
    });
  });
});
