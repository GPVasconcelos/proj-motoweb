import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/cliente/dashboard/dashboard.component';
import { MinhasEntregasComponent } from './features/cliente/minhas-entregas/minhas-entregas.component';
import { NovaEntregaComponent } from './features/cliente/nova-entrega/nova-entrega.component';
import { CadastroComponent } from './features/auth/cadastro/cadastro.component';
import { CadastroClienteComponent } from './features/auth/cadastro/cadastro-cliente/cadastro-cliente.component';
import { CadastroCentralComponent } from './features/auth/cadastro/cadastro-central/cadastro-central.component';
import { EntregasComponent } from './features/supplier/entregas/entregas.component';
import { SupplierModule } from './features/supplier/supplier.module';
import { DashboardSupplierComponent } from './features/supplier/dashboard/dashboard.component';

export const routes: Routes = [
  // Rota de login
  { path: 'login', component: LoginComponent },
   // rotas de cadastro
  { path: 'cadastro', component: CadastroComponent },
  { path: 'cadastro/cadastro-cliente/:userId', component: CadastroClienteComponent },
  { path: 'cadastro/cadastro-central/:userId', component: CadastroCentralComponent },

  // Rotas protegidas do cliente
  {
    path: 'cliente',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'minhas-entregas', pathMatch: 'full' },
      { path: 'minhas-entregas', component: MinhasEntregasComponent },
      { path: 'nova-entrega', component: NovaEntregaComponent }
    ]
  },

  // Rotas protegidas do fornecedor
  {
    path: 'supplier',
    component: DashboardSupplierComponent,
    children: [
      { path: 'entregas', component: EntregasComponent },
      { path: '', redirectTo: 'entregas', pathMatch: 'full' }
    ]
  },

  // Redirecionamento padrão
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Rota coringa para páginas não encontradas
  { path: '**', redirectTo: 'login' }
];
