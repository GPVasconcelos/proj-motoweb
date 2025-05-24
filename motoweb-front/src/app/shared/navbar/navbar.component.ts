import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() role: 'CLIENTE' | 'CENTRAL' | 'MOTOBOY' = 'CLIENTE';

  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
