import {ApplicationRef, Component, OnInit} from '@angular/core';
import {interval, Observable} from "rxjs";

import {FarmService} from "../../farms/services/farm.service";
import {PlantCycleService} from '../../farms/services/plantCycle/plant-cycle.service';
import {FarmInterface} from "../../farms/types/farmInterface";
import {PlantCycleInterface} from "../../farms/types/plantCycleInterface";
import {FarmCropService} from "../../farms/services/farmCrop/farm-crop.service";
import {FarmCropInterface} from "../../farms/types/cropInterface";
import { SwUpdate } from '@angular/service-worker';
import { AuthService } from 'src/app/auth/service/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  token = localStorage.getItem('token') || '';

  farms$: Observable<FarmInterface[]> | any;
  farmCrops: FarmCropInterface | any;
  selectedFarmCrop: FarmCropInterface | any;

  loggedUser = JSON.parse(localStorage.getItem('auth') || '');
  userId: any;
  userTypeId: string = '';
  plantCycle: PlantCycleInterface | any;
  cropCycleName: string = '';
  cropCycleDescription: string = '';

  constructor(
    private farmsService: FarmService,
    private cropCycleService: PlantCycleService,
    private farmCropService: FarmCropService,
    private swUpdate: SwUpdate,
    private authService: AuthService,
    private appRef: ApplicationRef
  ) {
  }

  ngOnInit(): void {
    this.userId = this.loggedUser.loggedInUser.id
    this.userTypeId = this.loggedUser.loggedInUser.user_type_id

    this.getFarms();
    this.getPlantCycle();
    this.getFarmCrops();
    this.checkUpdate()
    this.checkForUpdate();
    this.authService.scheduleRefreshToken();
  }

  checkForUpdate() {
    if (!this.swUpdate.isEnabled) {
      console.log('Update Not Enabled');
      return;
    }
    this.swUpdate.available.subscribe({
      next: (available: any) => {
        if (confirm('Update Available. Would you like to download the update?')) {
          this.swUpdate.activateUpdate().then(() => {
            location.reload();
          })
        }
      },
      error: (error: any) => {}
    })
  };
  checkUpdate() {
    this.appRef.isStable.subscribe({
      next: (isStable: any) => {
        const timeInterval = interval(8 * 60 * 60 * 1000);

        timeInterval.subscribe({
          next: () => {
            this.swUpdate.checkForUpdate().then(() =>
            console.log('update checkd'))
          },
          error: (error: any) => {
            console.log('Not stable')
          }
        })
      },
      error: (error: any) => {}
    })

  }

  //// Get Plant Cycle
  getPlantCycle() {
    this.cropCycleService.entities$.subscribe({
      next: (plantCycle: PlantCycleInterface[]) => {
        if (this.userTypeId == '3') {
          this.plantCycle = plantCycle
        } else {
          this.plantCycle = plantCycle.filter((pc: PlantCycleInterface) => {
            return pc.created_by == this.userId;
          });
        }
      },
      error: (error: any) => {
        console.error('Error getting plant cycle', error);
      }
    })
  };

  //// Get Farms
  getFarms() {
    this.farmsService.entities$.subscribe({
      next: (farms: any) => {
        if (this.userTypeId == '3') {
          this.farms$ = farms
        } else {
          this.farms$ = farms.filter((farm: any) => {
            return farm.user_id === this.userId
          })
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  };

  //// Get Farm Crops
  getFarmCrops() {
    this.farmCropService.entities$.subscribe({
      next: (farmCrop: any) => {
        if (this.userTypeId == '3') {
          this.farmCrops = farmCrop
        } else {
          this.farmCrops = farmCrop.filter((farmCrop: any) => {
            return farmCrop.farm.user_id === this.userId
          })
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  };

  //// Assign Crop Cycle Farm name, crop cycle name and description
  getCropCycleFarm(cropCycleId: any, cropCycleName: string, description: string) {
    this.cropCycleName = cropCycleName;
    this.cropCycleDescription = description;
    this.selectedFarmCrop = this.farmCrops.find((f: FarmCropInterface) => f.id === cropCycleId);
  }
}
