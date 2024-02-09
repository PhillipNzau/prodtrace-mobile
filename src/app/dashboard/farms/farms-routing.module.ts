import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListFarmsComponent} from "./components/list-farms/list-farms.component";
import {FarmDetailComponent} from "./components/farm-detail/farm-detail.component";
import {CropDetailComponent} from "./components/crop-detail/crop-detail.component";
import {AddFarmComponent} from "./components/add-farm/add-farm.component";
import {AddCropComponent} from "./components/add-crop/add-crop.component";
import {QrdataPageComponent} from "../../shared/qrdata-page/qrdata-page.component";

const routes: Routes = [
  { path: '', component: ListFarmsComponent,},
  { path: 'add-farm', component: AddFarmComponent },
  { path: 'selected-farm/:id/add-crop', component: AddCropComponent },
  {path: 'selected-farm/:id', component: FarmDetailComponent },
  {path: 'selected-farm/:id/selected-farm-crop/:farm_crop_id', component: CropDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmsRoutingModule { }
