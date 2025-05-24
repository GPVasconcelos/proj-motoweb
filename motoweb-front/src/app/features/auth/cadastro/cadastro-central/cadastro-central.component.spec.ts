import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCentralComponent } from './cadastro-central.component';

describe('CadastroCentralComponent', () => {
  let component: CadastroCentralComponent;
  let fixture: ComponentFixture<CadastroCentralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroCentralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroCentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
