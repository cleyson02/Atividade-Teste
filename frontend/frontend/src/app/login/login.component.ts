import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthService } from '../services/auth.service';
import { CepService } from '../services/cep.service';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  mostrarSucesso = false;
  mensagemErro = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cepService: CepService,
    private bottomSheet: MatBottomSheet
  ) {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
      senha: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$')
      ]],
      cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      endereco: this.fb.group({
        logradouro: [''],
        bairro: [''],
        localidade: [''],
        uf: ['']
      }),
      campoLivre: ['']
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          this.mostrarSucesso = true;
          this.mensagemErro = '';
        },
        error => {
          this.mostrarSucesso = false;
          this.mensagemErro = 'Erro no login. Verifique suas credenciais.';
        }
      );
    }
  }

  onCepBlur(): void {
    const cep = this.loginForm.get('cep')?.value;
    if (cep && cep.length === 8) {
      this.cepService.buscarCep(cep).subscribe(
        data => {
          this.loginForm.patchValue({
            endereco: {
              logradouro: data.logradouro,
              bairro: data.bairro,
              localidade: data.localidade,
              uf: data.uf
            }
          });
        },
        error => {
          console.error('Erro ao buscar CEP:', error);
        }
      );
    }
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetComponent);
  }

  recuperarSenha(): void {
    const email = this.loginForm.get('login')?.value;
    if (email) {
      this.authService.recuperarSenha(email).subscribe(
        response => {
          alert('Email de recuperação enviado com sucesso!');
        },
        error => {
          alert('Erro ao enviar email de recuperação.');
        }
      );
    }
  }
}