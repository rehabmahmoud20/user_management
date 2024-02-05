import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private __AuthService: AuthService,
    private __Router:Router
  ) {}
  signUpForm: FormGroup;
  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  get formControls() {
    return this.signUpForm.controls;
  }
  onSubmit(): void {
    this.__AuthService.handleLogin(this.signUpForm.value)
    this.__Router.navigate(['/home']);
  }
}
