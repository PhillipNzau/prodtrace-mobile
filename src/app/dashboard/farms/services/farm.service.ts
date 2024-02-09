import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";
import {FarmInterface} from "../types/farmInterface";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FarmService extends EntityCollectionServiceBase<FarmInterface> {
  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('Farms', serviceElementFactory)
  }

}
