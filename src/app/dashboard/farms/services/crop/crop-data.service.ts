import {Injectable} from "@angular/core";
import {DefaultDataService, HttpUrlGenerator} from "@ngrx/data";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {environment} from "../../../../../environments/environment";
import {CropInterface} from "../../types/cropInterface";

@Injectable({
  providedIn: 'root'
})
export class CropDataService extends DefaultDataService<CropInterface> {
  /////// CROP URL
  listCropsUrl = environment.listCrop;
  createCropUrl = environment.createCrop;
  getCropUrl = environment.getCrop;
  updateCropUrl = environment.updateCrop;


  constructor(http: HttpClient, httpUrlGenerator:HttpUrlGenerator) {
    super('FarmCrop', http, httpUrlGenerator);
  }

  override getAll(): Observable<any> {
    return this.http.get<any>(this.listCropsUrl).pipe(
      map((crops:any) => {
        return crops.results
      })
    )
  }
}
