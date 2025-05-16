import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditFormComponent } from './dialog-edit-form.component';

describe('DialogEditFormComponent', () => {
  let component: DialogEditFormComponent;
  let fixture: ComponentFixture<DialogEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
