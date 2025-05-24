import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/cliente/dashboard/dashboard.component';
import { MinhasEntregasComponent } from './features/cliente/minhas-entregas/minhas-entregas.component';
import { NovaEntregaComponent } from './features/cliente/nova-entrega/nova-entrega.component';
import { CadastroComponent } from './features/auth/cadastro/cadastro.component';
import { CadastroClienteComponent } from './features/auth/cadastro/cadastro-cliente/cadastro-cliente.component';
import { CadastroCentralComponent } from './features/auth/cadastro/cadastro-central/cadastro-central.component';
import { CadastroMotoboyComponent } from './features/auth/cadastro/cadastro-motoboy/cadastro-motoboy.component';


export const routes: Routes = [
  // Rota de login
  { path: 'login', component: LoginComponent },
   // rotas de cadastro
  { path: 'cadastro', component: CadastroComponent },
  { path: 'cadastro-cliente/:userId', component: CadastroClienteComponent },
  { path: 'cadastro-central/:userId', component: CadastroCentralComponent },
  { path: 'cadastro-motoboy/:userId', component: CadastroMotoboyComponent },

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

  // Redirecionamento padrão
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Rota coringa para páginas não encontradas
  { path: '**', redirectTo: 'login' }
];
