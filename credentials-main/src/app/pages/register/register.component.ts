import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { Credentials } from '../../core/models/credentials';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
formRegister;

  constructor(private fb: FormBuilder,private auth: AuthService,private router: Router) {
    this.formRegister = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
  if (this.formRegister.valid) {
    const creds: Credentials = {
      email: this.formRegister.value.email || '',
      password: this.formRegister.value.password || ''
    };
    this.auth.register(creds);
    this.router.navigate(['/login']);
  }
}


  getError(control: string) {
  const c = (this.formRegister.controls as any)[control];

  if (!c || !c.errors) return '';

  switch (control) {
    case 'email':
      if (c.errors['required']) return 'El campo email es requerido';
      if (c.errors['email']) return 'El email no es correcto';
      break;

    case 'password':
      if (c.errors['required']) return 'El campo contraseña es requerido';
      if (c.errors['minlength'])
        return `La contraseña debe tener al menos ${c.errors['minlength'].requiredLength} caracteres`;
      break;
    default:
      return '';
  }
  return '';
}

}
