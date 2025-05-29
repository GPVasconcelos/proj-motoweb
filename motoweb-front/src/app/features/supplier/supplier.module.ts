import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardSupplierComponent } from './dashboard/dashboard.component';
import { EntregasComponent } from './entregas/entregas.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardSupplierComponent,
    EntregasComponent,
    RouterModule
  ]
})
export class SupplierModule { }
 