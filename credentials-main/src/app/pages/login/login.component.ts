import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { RouterModule } from '@angular/router';
import { Credentials } from '../../core/models/credentials';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formLogin;
  //Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]
  constructor(
    private formSvc: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.formLogin = this.formSvc.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.formLogin.valid) {
      const creds: Credentials = {
        email: this.formLogin.value.email || '',
        password: this.formLogin.value.password || '',
      };
      this.auth.login(creds);
      if (this.auth.isAuthenticated()) {
        this.router.navigate(['/dashboard']);
      } else {
        alert('Email o contraseña incorrectos');
      }
    }
  }

    getError(control: string) {
      switch (control) {
        case 'email':
          if (
            this.formLogin.controls.email.errors != null &&
            Object.keys(this.formLogin.controls.email.errors).includes('required')
          )
            return 'El campo email es requerido';
          else if (
            this.formLogin.controls.email.errors != null &&
            Object.keys(this.formLogin.controls.email.errors).includes('email')
          )
            return 'El email no es correcto';

          break;
        case 'password':
          if (
            this.formLogin.controls.password.errors != null &&
            Object.keys(this.formLogin.controls.password.errors).includes(
              'required'
            )
          )
            return 'El campo email es requerido';
          break;
        default:
          return '';
      }
      return '';
    }
}
