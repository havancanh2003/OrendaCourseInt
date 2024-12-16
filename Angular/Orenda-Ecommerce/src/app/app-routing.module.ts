import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './layouts/layouts.component';
import { LoginComponent } from './pages/login/login.component';
import { authCanMatchGuard, authConfirmOTP } from './shared/guards/auth.guard';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ConfirmOtpComponent } from './pages/confirm-otp/confirm-otp.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forgot-password',
    children: [
      {
        path: '',
        component: ForgotPasswordComponent,
      },
      {
        path: 'confirm-otp',
        component: ConfirmOtpComponent,
        canActivate: [authConfirmOTP],
      },
    ],
  },
  {
    path: '',
    component: LayoutsComponent,
    loadChildren: () =>
      import('./pages/pages.module').then((l) => l.PagesModule),
    canMatch: [authCanMatchGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
