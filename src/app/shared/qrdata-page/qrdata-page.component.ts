import {Component, OnInit} from '@angular/core';
import { QrDataInterface} from "../../dashboard/farms/types/plantCycleInterface";
import {FarmCropService} from "../../dashboard/farms/services/farmCrop/farm-crop.service";
import {PlantCycleService} from "../../dashboard/farms/services/plantCycle/plant-cycle.service";
import {ActivatedRoute} from "@angular/router";
import {FarmCropCycleService} from "../../dashboard/farms/services/plantCycle/farm-crop-cycle.service";
import {FarmCycleService} from "../../dashboard/farms/services/plantCycle/farm-cycle.service";
import {FarmCyclesService} from "../../dashboard/farms/services/plantCycle/farm-cycles.service";
import {map} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-qrdata-page',
  templateUrl: './qrdata-page.component.html',
  styleUrls: ['./qrdata-page.component.scss']
})
export class QrdataPageComponent implements OnInit{

  qrcodeFarmUrl= environment.listFarmQuery
  qrcodePlantCycleUrl = environment.listPlantCycleQuery;
  qrcodeCropActivityUrl= environment.listCropActivityQuery


  selectedFarmCropId: any;
  selectedFarmId: any;
  farmCrop: QrDataInterface | undefined;
  cropCycleLoaded :boolean = false;

  //// planting Stage
  plantingCycleStage: any
  //// growth Stage
  growthCycleStage: any
  //// harvest Stage
  harvestCycleStage: any;

  blockFarm:any;
  blockFarmCrop:any;
  blockFarmCropCycle:any;


  constructor(
    private farmCropService: FarmCropService,
    private cropCycleService: PlantCycleService,
    private farmCropCycleService: FarmCropCycleService,
    private farmCycleService: FarmCycleService,
    private route: ActivatedRoute,
    private myFarmsService: FarmCyclesService,
    private http: HttpClient
  ) {
  }
  ngOnInit() {
    this.selectedFarmCropId = this.route.snapshot.url[2].path;
    this.selectedFarmId = this.route.snapshot.url[1].path;
    this.getFarmData(this.selectedFarmId).subscribe({})
    this.getFarmCropData(this.selectedFarmCropId).subscribe({})
    this.getFarmCropCycleData(this.selectedFarmCropId).subscribe({})

    this.myFarmsService.getFarmData(this.selectedFarmId).subscribe({})
    this.myFarmsService.getFarmCropData(this.selectedFarmCropId).subscribe({})
    this.myFarmsService.getFarmCropCycleData(this.selectedFarmCropId).subscribe({})

  }

  getFarmData(farmId:any) {

    return this.http.get(this.qrcodeFarmUrl+ `=${farmId}`).pipe(
      map((response:any) => {
        const farmData = {
          id: response[0],
          name: response[1],
          location: response[2],
          size: response[3],
        }

        this.blockFarm = farmData
      })
    )
  }

  getFarmCropData(farmCropId:any) {
    return this.http.get(this.qrcodePlantCycleUrl+ `=${farmCropId}`).pipe(
      map((response:any) => {
        const farmCropData = {
          id: response[0],
          cropName: response[1],
          cropGreenHouse: response[2],
          farmId: response[3],
        }
        this.blockFarmCrop = farmCropData
      })
    )
  }

  getFarmCropCycleData(farmCropId:any) {
    return this.http.get(this.qrcodeCropActivityUrl+ `=${farmCropId}`).pipe(
      map((response:any) => {
        const farmCropCycleData: { id: any; time: any; activityType: any; activityName: any; activityDescription: any; farmCropId: any; }[] = []
        response.forEach((item:any)=> {
          const cropActivity = {
            id:item[1],
            time:item[0],
            activityType: item[2],
            activityName: item[3],
            activityDescription:item[4],
            farmCropId:item[5],
          }
          farmCropCycleData.push(cropActivity)
        })

        this.blockFarmCropCycle = farmCropCycleData
        this.plantingCycleStage = this.blockFarmCropCycle.filter((item:any) => item.activityType === 'Planting')
        this.growthCycleStage = this.blockFarmCropCycle.filter((item:any) => item.activityType === 'Growth')
        this.harvestCycleStage = this.blockFarmCropCycle.filter((item:any) => item.activityType === 'Harvest')
      })
    )
  }

}


