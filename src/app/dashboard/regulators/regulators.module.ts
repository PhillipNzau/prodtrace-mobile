import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { RegulatorsRoutingModule } from './regulators-routing.module';
import { RegulatorsComponent } from './regulators.component';
import { ListRegulatorsComponent } from './components/list-regulators/list-regulators.component';
import { SelectedRegulatorComponent } from './components/selected-regulator/selected-regulator.component';
import { SelectedServiceComponent } from './components/selected-service/selected-service.component';
import {SharedModule} from "../../shared/shared.module";
import {DashboardModule} from "../dashboard.module";
import {FormsModule} from "@angular/forms";
import { ServiceRequestFormComponent } from './components/service-request-form/service-request-form.component';


@NgModule({
  declarations: [
    RegulatorsComponent,
    ListRegulatorsComponent,
    SelectedRegulatorComponent,
    SelectedServiceComponent,
    ServiceRequestFormComponent
  ],
    imports: [
        CommonModule,
        RegulatorsRoutingModule,
        SharedModule,
        DashboardModule,
        FormsModule,
        NgOptimizedImage
    ]
})
export class RegulatorsModule { }
