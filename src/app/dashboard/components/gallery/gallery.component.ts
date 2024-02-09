import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {FarmInterface} from "../../farms/types/farmInterface";
import {FarmService} from "../../farms/services/farm.service";
import {Store} from "@ngrx/store";
import {FarmCropInterface} from "../../farms/types/cropInterface";
import {FarmCropService} from "../../farms/services/farmCrop/farm-crop.service";
import {PlantCycleInterface} from "../../farms/types/plantCycleInterface";
import {PlantCycleService} from "../../farms/services/plantCycle/plant-cycle.service";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  farms$: Observable<FarmInterface[]> | any;
  selectedFarmId:any ;
  selectedFarm: string = '';
  selectedFarmCrop: string = '';
  selectedFarmCropId: any;
  farmCrops: FarmCropInterface | any;
  loggedUser = JSON.parse(localStorage.getItem('auth') || '') ;
  userId: string = '';
  userTypeId: string = '';

  cropCycleLoaded :boolean = false;

  //// planting Stage
  plantingCycleStage: PlantCycleInterface[] = [];
  //// growth Stage
  growthCycleStage: PlantCycleInterface[] = [];
  //// harvest Stage
  harvestCycleStage: PlantCycleInterface[] = [];

  plantingImages: any;




  constructor(
    private store: Store,
    private farmsService: FarmService,
    private farmCropService: FarmCropService,
    private cropCycleService: PlantCycleService,

  ) {
  }

  ngOnInit() {
    this.userId = this.loggedUser.loggedInUser.id;
    this.userTypeId = this.loggedUser.loggedInUser.user_type_id;
    this.getUserFarms();

    //// Get all crop cycles
    this.cropCycleService.getAll().subscribe({
      next: () => {},
      error: (error: any) => {
        console.error('Error Getting plant cycle', error);
      }
    });
  }

  getUserFarms() {
    this.farmsService.entities$.subscribe({
      next: (farms: any) => {
        if (this.userTypeId == '3') {
          this.farms$ = farms

        } else {
          this.farms$ = farms.filter((farm: any) =>{

            return farm.user_id === this.userId
          })
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  setFarm(farm: FarmInterface) {
    this.selectedFarmId = farm.id;
    this.selectedFarm = farm.name;
    this.getFarmCrops();
  }

  getFarmCrops() {
    this.farmCropService.entities$.subscribe({
      next: (farmCrops:FarmCropInterface[]) => {
        this.farmCrops = farmCrops.filter((farmCrop:FarmCropInterface) => {
          return farmCrop.farm_id == this.selectedFarmId
        });
      }
    });
  }

  setFarmCrop(farmCrop: any) {
    this.selectedFarmCrop = farmCrop.crop.name;
    this.selectedFarmCropId = farmCrop.id;
    this.getFarmCropCycle()
  }

  /////////////
  getFarmCropCycle() {
    this.cropCycleService.entities$.subscribe({
      next: (cropStages:any[]) => {
        const stages = cropStages.filter(cropStage => cropStage.farm_crop_id == this.selectedFarmCropId);

        //// Planting Stage
        this.plantingCycleStage = stages.filter(stage => stage.plant_cycle_stage_id == 1);

        //// Growth Stage
        this.growthCycleStage = stages.filter(stage => stage.plant_cycle_stage_id == 2);
        //// Harvest Stage
        this.harvestCycleStage = stages.filter(stage => stage.plant_cycle_stage_id == 3);
      },
      error: (error: any) => {
        console.error('Error Getting Filtered plant cycle', error);
      }
    })

  }
}
