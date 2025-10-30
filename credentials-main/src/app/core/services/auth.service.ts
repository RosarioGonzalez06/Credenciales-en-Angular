import { Injectable, signal } from '@angular/core';
import { Credentials } from '../models/credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user:any|null;

  constructor() { 
  this.user = signal<any>(null);
  const cookie = localStorage.getItem('AUTHENTICATION');
  if(cookie){
    this.user.set(JSON.parse(cookie));
  }
}

  register(credentials: Credentials) {
    const users: Credentials[] = JSON.parse(localStorage.getItem('USERS') || '[]');
    users.push(credentials);
    localStorage.setItem('USERS', JSON.stringify(users));
  }

  getUser(): { email: string; password: string } | null {
  const data = localStorage.getItem('AUTHENTICATION');
  return data ? JSON.parse(data) : null;
}

isAuthenticated(): boolean {
    return this.user() != null;
  }

  login(credentials: Credentials): boolean {
  const users: Credentials[] = JSON.parse(localStorage.getItem('USERS') || '[]');

  const found = users.find(u => u.email === credentials.email && u.password === credentials.password);

  if(found) {
    localStorage.setItem('AUTHENTICATION', JSON.stringify(found));
    this.user.set(found);
    return true;
  }
  return false;
}

  logout(){
    localStorage.removeItem('AUTHENTICATION');
    this.user.set(null);
  }

}
