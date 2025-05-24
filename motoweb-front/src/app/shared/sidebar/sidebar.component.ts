import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() role: 'CLIENTE' | 'CENTRAL' | 'MOTOBOY' = 'CLIENTE';

  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
