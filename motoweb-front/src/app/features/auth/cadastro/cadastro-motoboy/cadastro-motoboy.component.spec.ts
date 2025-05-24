import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroMotoboyComponent } from './cadastro-motoboy.component';

describe('CadastroMotoboyComponent', () => {
  let component: CadastroMotoboyComponent;
  let fixture: ComponentFixture<CadastroMotoboyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroMotoboyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroMotoboyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
