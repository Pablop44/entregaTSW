import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheroComponent } from './fichero.component';

describe('FicheroComponent', () => {
  let component: FicheroComponent;
  let fixture: ComponentFixture<FicheroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
