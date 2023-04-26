import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductAddComponent } from './new-product-add.component';

describe('NewProductAddComponent', () => {
  let component: NewProductAddComponent;
  let fixture: ComponentFixture<NewProductAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProductAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
