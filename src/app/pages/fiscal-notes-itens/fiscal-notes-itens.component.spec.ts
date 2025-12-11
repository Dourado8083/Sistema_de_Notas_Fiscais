import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalNotesItensComponent } from './fiscal-notes-itens.component';

describe('FiscalNotesItensComponent', () => {
  let component: FiscalNotesItensComponent;
  let fixture: ComponentFixture<FiscalNotesItensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiscalNotesItensComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiscalNotesItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
