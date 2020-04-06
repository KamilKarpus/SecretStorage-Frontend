import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AuthGuardService as AuthGuard } from './_services/auth/auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component:LoginComponent},
  { path: 'main', component: MainPageComponent, canActivate: [AuthGuard] },
  // { path: 'organization/:id', component: OrganizationComponent },
  // { path: 'organization/:id/collection/:collectionId', component: CollectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
