import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcorrenciaHistoricoComponent } from './ocorrencia-historico.component';

describe('OcorrenciaHistoricoComponent', () => {
  let component: OcorrenciaHistoricoComponent;
  let fixture: ComponentFixture<OcorrenciaHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcorrenciaHistoricoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OcorrenciaHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
