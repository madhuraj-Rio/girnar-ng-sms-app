import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'dashboard',
  loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{ }
