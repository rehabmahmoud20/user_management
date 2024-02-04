import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { authGurdGuard } from './guard/auth-gurd.guard';

const routes: Routes = [
  {
    path: '',
    // component: LoginViewComponent,
    loadChildren: () => import('./views/login-view/login-view.module').then(m => m.LoginViewModule),

    
  },
  {
    path: 'home',
    // component: HomeComponent,
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
    // canActivate: [authGurdGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
