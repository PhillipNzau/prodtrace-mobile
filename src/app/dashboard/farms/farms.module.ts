import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GoogleMapsModule} from "@angular/google-maps";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {FarmsRoutingModule} from './farms-routing.module';
import {FarmsComponent} from './farms.component';
import {SharedModule} from "../../shared/shared.module";
import {ListFarmsComponent} from './components/list-farms/list-farms.component';
import {DashboardModule} from "../dashboard.module";
import {FarmDetailComponent} from './components/farm-detail/farm-detail.component';
import {CropDetailComponent} from './components/crop-detail/crop-detail.component';
import { AddFarmComponent } from './components/add-farm/add-farm.component';
import { AddCropComponent } from './components/add-crop/add-crop.component';
import {QRCodeModule} from "angularx-qrcode";
import { QrdataPageComponent } from '../../shared/qrdata-page/qrdata-page.component';
import { UnixTimestampPipe } from './services/plantCycle/unix-timestamp.pipe';


@NgModule({
  declarations: [
    FarmsComponent,
    ListFarmsComponent,
    FarmDetailComponent,
    CropDetailComponent,
    AddFarmComponent,
    AddCropComponent,
    QrdataPageComponent,
    UnixTimestampPipe
  ],
  imports: [
    CommonModule,
    FarmsRoutingModule,
    SharedModule,
    GoogleMapsModule,
    DashboardModule,
    ReactiveFormsModule,
    FormsModule,
    QRCodeModule,
    // StoreModule.forFeature('farms-state', farmsReducer),
    // EffectsModule.forFeature([FarmsEffects, CropsEffects])
  ]
})
export class FarmsModule {
}
