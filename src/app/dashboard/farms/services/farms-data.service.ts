import {DefaultDataService, HttpUrlGenerator} from "@ngrx/data";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";

import {FarmInterface} from "../types/farmInterface";
import {environment} from "../../../../environments/environment";
import {Update} from "@ngrx/entity";

@Injectable({
  providedIn: 'root'
})
export class FarmsDataService extends DefaultDataService<FarmInterface> {
  /////// FARM URL
  listFarmsUrl = environment.listFarms;
  createFarmUrl = environment.createFarm
  getFarmUrl = environment.getFarm;
  updateFarmUrl = environment.updateFarm;

  constructor(http: HttpClient, httpUrlGenerator:HttpUrlGenerator) {
    super('Farms', http, httpUrlGenerator);
  }

  override getAll(): Observable<any> {
    return this.http.get<any>(this.listFarmsUrl).pipe(
      map((farms: any) => {
        return farms.results
      } ))
  }

  override add(farmData: FarmInterface): Observable<FarmInterface> {
    return this.http.post<FarmInterface>(this.createFarmUrl, farmData).pipe(
      map((farm:FarmInterface) => farm)
    )
  }

  override delete(key: number | string): Observable<number | string> {
    return super.delete(key);
  }

  override update(farm: Update<any>): Observable<any> {
    return this.http.patch<any>(this.updateFarmUrl + farm.id, farm.changes).pipe(
      map((farm:FarmInterface) => {
        return farm
      })
    )
  }

}
