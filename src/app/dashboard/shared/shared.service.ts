import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // constructor(private store: Store<FarmState>) { }
  //
  // initializeLIstFarms(loadedStatus: any, getFarms: any): any {
  //   this.store.pipe(select(farmSelectors.areFarmsLoaded)).subscribe({
  //     next: (loaded) => {
  //       loadedStatus = loaded
  //     },
  //     error: () => {}
  //   })
  //
  //   if (!loadedStatus) {
  //     this.store.dispatch(listFarmsAction());
  //   }
  //  getFarms = this.store.pipe(select(farmSelectors.selectAllFarms));
  //   return getFarms;
  // }
  //
  // /////////////////////////
  // fetchFarmData(): Observable<any> {
  //   return this.store.pipe(select(farmSelectors.selectAllFarms));
  // }
}
