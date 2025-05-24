import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../cliente/dashboard/dashboard.component';
import { MinhasEntregasComponent } from './minhas-entregas/minhas-entregas.component';
import { NovaEntregaComponent } from './nova-entrega/nova-entrega.component';
import { NotificacoesComponent } from './notificacoes/notificacoes.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    DashboardComponent,
    MinhasEntregasComponent,
    NovaEntregaComponent,
    NotificacoesComponent,
    RouterModule
  ]
})
export class ClienteModule { }
