import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FarmCyclesService {
  qrcodeFarmUrl= environment.listFarmQuery
  qrcodePlantCycleUrl = environment.listPlantCycleQuery;
  qrcodeCropActivityUrl= environment.listCropActivityQuery




  constructor(private http: HttpClient) { }

  getFarmData(farmId:any) {
    return this.http.get(this.qrcodeFarmUrl+ `=${farmId}`).pipe(
      map((response:any) => {
        const farmData = {
          id: response[0],
          name: response[1],
          location: response[2],
          size: response[3],
        }
        localStorage.setItem('blockFarmData', JSON.stringify(farmData))
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
        localStorage.setItem('blockFarmCropData', JSON.stringify(farmCropData))
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
        localStorage.setItem('blockFarmCropCycleData', JSON.stringify(farmCropCycleData))
      })
    )
  }
}
