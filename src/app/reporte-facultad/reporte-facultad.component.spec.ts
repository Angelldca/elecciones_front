import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteFacultadComponent } from './reporte-facultad.component';

describe('ReporteFacultadComponent', () => {
  let component: ReporteFacultadComponent;
  let fixture: ComponentFixture<ReporteFacultadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteFacultadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteFacultadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
