import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./auth/service/auth.guard";
import {RoleGuard} from "./auth/service/role.guard";
import {LoggInGuard} from "./auth/service/loggin.guard";
import {AuthenticationComponent} from "./auth/components/authentication/authentication.component";
import {QrdataPageComponent} from "./shared/qrdata-page/qrdata-page.component";

const routes: Routes = [

  { path: 'auth', component:AuthenticationComponent, canActivate: [LoggInGuard] },
  {path: 'farm-crop-details/:id/:id', component: QrdataPageComponent},


  { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard, RoleGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
