import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SelectedRegulatorComponent} from "./components/selected-regulator/selected-regulator.component";
import {SelectedServiceComponent} from "./components/selected-service/selected-service.component";
import {ListRegulatorsComponent} from "./components/list-regulators/list-regulators.component";
import {ServiceRequestFormComponent} from "./components/service-request-form/service-request-form.component";

const routes: Routes = [
  { path: '', component: ListRegulatorsComponent },
  {path: 'regulator/:id', component: SelectedRegulatorComponent},
  {path: 'regulator/:id/service/:id', component: SelectedServiceComponent},
  {path: 'regulator/:id/service/:id/request', component: ServiceRequestFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegulatorsRoutingModule { }
