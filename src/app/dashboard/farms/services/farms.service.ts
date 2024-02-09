import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {FarmInterface} from "../types/farmInterface";
import {CropInterface, FarmCropInterface} from "../types/cropInterface";
import {refreshTokenAction} from "../../../auth/state/auth.actions";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class FarmsService {
  refresh = localStorage.getItem('refresh') || '';
  /////// FARM URL
  listFarmsUrl = environment.listFarms;
  createFarmUrl = environment.createFarm
  getFarmUrl = environment.getFarm;
  updateFarmUrl = environment.updateFarm;

  /////// CROP URL
  listCropsUrl = environment.listCrop;
  createCropUrl = environment.createCrop;
  getCropUrl = environment.getCrop;
  updateCropUrl = environment.updateCrop;

  listFarmCropsUrl = environment.listFarmCrop;
  createFarmCropUrl = environment.createFarmCrop;
  getFarmCropUrl = environment.getFarmCrop;
  updateFarmCropUrl = environment.updateFarmCrop;


  constructor( private http: HttpClient,   private store: Store,) {}

  proceedAddFarm(farmData: FarmInterface): Observable<any> {
    return this.http.post<FarmInterface>(this.createFarmUrl, farmData).pipe(
      map((farm:FarmInterface) => farm)
    )
  };

  proceedListFarms(): Observable<FarmInterface> {
    return this.http.get<FarmInterface>(this.listFarmsUrl).pipe(
      map((farms: FarmInterface) => farms)
    )
  };

  proceedGetSelectedFarm(id: number): Observable<FarmInterface> {
    return this.http.get<FarmInterface>(this.getFarmUrl + id).pipe(
      map((farm: FarmInterface) => farm)
    )
  };

  //////////////// FARM CROP CALLS
  proceedListFarmCrops(farmId: number): Observable<FarmCropInterface> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('farm_id', farmId);
    return this.http.get<FarmCropInterface>(this.listFarmCropsUrl, {params: queryParams}).pipe(
      map((crop:FarmCropInterface) => crop)
    )
  };

  proceedAddFarmCrop(cropData: FarmCropInterface): Observable<FarmCropInterface> {
    return this.http.post<FarmCropInterface>(this.createFarmCropUrl, cropData).pipe(
      map((crop:FarmCropInterface) => crop)
    )
  };

  proceedUpdateFarmCrop(farmCropData: any): Observable<FarmCropInterface> {
    return this.http.patch<FarmCropInterface>(this.updateFarmCropUrl + farmCropData.farmCropId, farmCropData).pipe(
      map((crop:FarmCropInterface) => crop)
    )
  };

  proceedGetSelectedFarmCrop(cropId: number): Observable<FarmCropInterface> {
    return this.http.get<FarmCropInterface>(this.listFarmCropsUrl + cropId).pipe(
      map((crop:FarmCropInterface) => crop)
    )
  }

  // proceedGetSelectedCrop(id: number): Observable<Crop> {
  //   return this.http.get<FarmInterface>(this.getFarmUrl + id).pipe(
  //     map((farm: FarmInterface) => farm)
  //   )
  // };

  //////////////// CROP CALLS
  proceedListCrops(): Observable<CropInterface> {
    return this.http.get<CropInterface>(this.listCropsUrl).pipe(
      map((crop:CropInterface) => crop)
    )
  }


  //////////////////////////
  checkToken() {
    const token = localStorage.getItem('token') || '';
    const todayDate = new Date().getTime();
    const tokenExpTime = localStorage.getItem('exTime') || ''
    const [year] = tokenExpTime.split('T')
    const expirationDate = new Date(year).getTime();
    const jwtPay = JSON.parse(window.atob(token.split('.')[1]));
    const jwtTime = jwtPay.exp * 1000;

    return  expirationDate > todayDate;
  }

 refreshToken() {
   if (this.checkToken()) {
     this.store.dispatch(refreshTokenAction({refresh: this.refresh}))
     console.log('Refreshed')
   }
 }

}
