import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
// here supposed to make the request to get send user data and get the token to enable the user to authnticated 
// but this a simple form
export class AuthService {
  private isAuthenticated = false;


  handleLogin(formData: any) {
    if (formData.name && formData.password) {
      this.isAuthenticated = true;
    }
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
