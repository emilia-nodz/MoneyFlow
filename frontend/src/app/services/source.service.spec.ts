import { TestBed } from '@angular/core/testing';

import { SourceService } from './source.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Source } from '../models/source';

describe('SourceService', () => {
  let service: SourceService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideHttpClient(),
        provideHttpClientTesting()]
    });
    
    service = TestBed.inject(SourceService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  const apiUrl = "http://localhost:8000/";

  const initialData: Source[] = [
        {
          id: 1,
          name: "food"
        },
        {
          id: 2,
          name: "clothes"
        }
      ];

  const sourceId = 1;

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
    const apiReq = httpTesting.expectOne(apiUrl + 'source/');
    expect(apiReq.request.method).toBe("GET");
    apiReq.flush(initialData);
  });

  it('should insert a source', () => {
    service.insertSource({
      id:3,
      name: "work"
    }).subscribe(source => {
      expect(source).toBeTruthy();
      expect(source.name).toBe("work");
    });
    const apiReq = httpTesting.expectOne(apiUrl + "source/");
    expect(apiReq.request.method).toBe("POST");
    expect(apiReq.request.body.name).toBe("work");
    apiReq.flush({
      id:3,
      name: "work"
    });
  });

  it('should update delete source by id', () => {
    service.deleteSource(sourceId).subscribe(source => {
      expect(source).toBeNull();
    });
    const apiReq = httpTesting.expectOne(apiUrl + "source/" + sourceId + "/");
    expect(apiReq.request.method).toBe("DELETE");
    apiReq.flush(null);
  });

  it('should update existing source by id', () => {
    service.updateSource({
      id: 1,
      name: "transport"
    }).subscribe(source => {
      expect(source).toBeTruthy();
      expect(source.name).toBe("transport");
    });
    const apiReq = httpTesting.expectOne(apiUrl + "source/" + sourceId + "/");
    expect(apiReq.request.method).toBe("PATCH");
    expect(apiReq.request.body.name).toBe("transport");
    apiReq.flush({
      id: 1,
      name: "transport"
    });
  });
});
