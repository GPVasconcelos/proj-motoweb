import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/cliente/dashboard/dashboard.component';
import { MinhasEntregasComponent } from './features/cliente/minhas-entregas/minhas-entregas.component';
import { NovaEntregaComponent } from './features/cliente/nova-entrega/nova-entrega.component';
import { CadastroComponent } from './features/auth/cadastro/cadastro.component';
import { CadastroClienteComponent } from './features/auth/cadastro/cadastro-cliente/cadastro-cliente.component';
import { CadastroCentralComponent } from './features/auth/cadastro/cadastro-central/cadastro-central.component';
import { EntregasComponent } from './features/supplier/entregas/entregas.component';
import { DashboardSupplierComponent } from './features/supplier/dashboard/dashboard.component';
import { HistoricoComponent } from './features/supplier/historico/historico.component';

import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  // Cadastro geral e por tipo
  { path: 'cadastro', component: CadastroComponent },
  { path: 'cadastro/cadastro-cliente/:userId', component: CadastroClienteComponent },
  { path: 'cadastro/cadastro-central/:userId', component: CadastroCentralComponent },

  // Rotas do cliente
  {
    path: 'cliente',
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['CLIENTE'] },
    children: [
      { path: '', redirectTo: 'minhas-entregas', pathMatch: 'full' },
      { path: 'minhas-entregas', component: MinhasEntregasComponent },
      { path: 'nova-entrega', component: NovaEntregaComponent }
    ]
  },

  // Rotas do fornecedor
  {
    path: 'supplier',
    component: DashboardSupplierComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['CENTRAL'] },
    children: [
      { path: 'entregas', component: EntregasComponent },
      { path: '', redirectTo: 'entregas', pathMatch: 'full' },
      { path: 'historico', component: HistoricoComponent }
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
