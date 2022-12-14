import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/component';
import { LoginComponent } from './pages/login/component';
import { MainComponent } from './pages/main/component';
import { AuthGuard } from './shared/guards/auth';
import { ConfirmationGuard } from './shared/guards/confirmation';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    canDeactivate: [ConfirmationGuard],
  },
  { path: 'landing', component: LandingComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
