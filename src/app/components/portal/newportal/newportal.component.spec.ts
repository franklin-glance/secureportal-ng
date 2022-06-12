import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewportalComponent } from './newportal.component';

describe('NewportalComponent', () => {
  let component: NewportalComponent;
  let fixture: ComponentFixture<NewportalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewportalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
