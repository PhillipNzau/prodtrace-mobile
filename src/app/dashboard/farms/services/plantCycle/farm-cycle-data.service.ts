import {Injectable} from "@angular/core";
import {DefaultDataService, HttpUrlGenerator} from "@ngrx/data";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FarmCycleDataService extends DefaultDataService<any> {
  ///// Farm CYCLE URL
  qrcodeFarmUrl= environment.listFarmQuery

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('FarmCycle', http, httpUrlGenerator);
  }
  override getWithQuery(queryParams :any): Observable<any[]> {
    return this.http.get(this.qrcodeFarmUrl + `=${queryParams.farmId}`).pipe(
      map((farm: any)=> {
        return farm
      }));
  }
}
