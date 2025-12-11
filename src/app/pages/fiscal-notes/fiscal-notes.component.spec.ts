import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalNotesComponent } from './fiscal-notes.component';

describe('FiscalNotesComponent', () => {
  let component: FiscalNotesComponent;
  let fixture: ComponentFixture<FiscalNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiscalNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiscalNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
