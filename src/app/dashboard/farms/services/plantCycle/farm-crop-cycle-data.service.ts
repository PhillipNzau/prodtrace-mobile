import {Injectable} from "@angular/core";
import {DefaultDataService, HttpUrlGenerator} from "@ngrx/data";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FarmCropCycleDataService extends DefaultDataService<any> {
  ///// FARM CROP CYCLE URL
  qrcodePlantCycleUrl = environment.listPlantCycleQuery;
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('FarmCropCycle', http, httpUrlGenerator);
  }

  override getWithQuery(queryParams :any): Observable<any[]> {
   return  this.http.get(this.qrcodePlantCycleUrl + `=${queryParams.farmCropId}`).pipe(
      map((farmCrop: any)=> {
        return farmCrop
      })
    )
  }
}
