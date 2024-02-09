import {Injectable} from "@angular/core";
import {DefaultDataService, HttpUrlGenerator} from "@ngrx/data";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlantCycleDataService extends DefaultDataService<any> {
  ///// PLANT CYCLE URL
  createPlantCycleUrl = environment.createPlantCycle;
  listPlantCycleUrl = environment.listPlantCycle;
  qrcodeCropActivityUrl= environment.listCropActivityQuery

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('PlantCycle', http, httpUrlGenerator);
  }

  override getAll(): Observable<any[]> {
    return this.http.get(this.listPlantCycleUrl).pipe(
      map((plantCycle: any) => {
        return plantCycle.results;
      })
    )
  };

  override add(plantCycle: any): Observable<any> {
    return this.http.post(this.createPlantCycleUrl, plantCycle).pipe(
      map((plantCycle) => {
        console.log('plant cycle',
          plantCycle)
        return plantCycle
      })
    )
  };

  override getWithQuery(queryParams :any): Observable<any[]> {
   return this.http.get(this.qrcodeCropActivityUrl + `=${queryParams.farmCropId}`).pipe(
      map((farm: any)=> {
        return farm
      }));
  }
}
