import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cadastro-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {

  userId: number = 0;

  formData = {
    cnpj: '',
    stateReg: '',
    fantasyName: '',
    sector: ''
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Pega o userId vindo da URL
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
  }

  onSubmit(): void {
    const payload = {
      userId: this.userId,
      cnpj: this.formData.cnpj,
      stateReg: this.formData.stateReg,
      fantasyName: this.formData.fantasyName,
      sector: this.formData.sector
    };

    this.http.post('http://localhost:3000/client', payload).subscribe({
      next: () => {
        alert('Cadastro de cliente realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar cliente:', err);
        alert('Erro ao cadastrar cliente. Verifique os dados e tente novamente.');
      }
    });
  }
}
