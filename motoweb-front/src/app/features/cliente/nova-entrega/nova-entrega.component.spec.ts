import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaEntregaComponent } from './nova-entrega.component';

describe('NovaEntregaComponent', () => {
  let component: NovaEntregaComponent;
  let fixture: ComponentFixture<NovaEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaEntregaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
