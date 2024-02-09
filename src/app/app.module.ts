import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ServiceWorkerModule} from '@angular/service-worker';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {localStorageSync} from "ngrx-store-localstorage";
import {routerReducer} from "@ngrx/router-store";
import {EntityDataModule, EntityDataService} from "@ngrx/data";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {AuthInterceptor} from "./shared/service/auth.interceptor";
import {AuthModule} from "./auth/auth.module";
import {entityConfig} from "./entity-metadata";
import {FarmsDataService} from "./dashboard/farms/services/farms-data.service";
import {FarmCropDataService} from "./dashboard/farms/services/farmCrop/farm-crop-data.service";
import {CropDataService} from "./dashboard/farms/services/crop/crop-data.service";
import {PlantCycleDataService} from "./dashboard/farms/services/plantCycle/plant-cycle-data.service";
import {ChatDataService} from "./dashboard/farms/services/chat/chat-data.service";
import {HotToastModule} from "@ngneat/hot-toast";
import {FarmCropCycleDataService} from "./dashboard/farms/services/plantCycle/farm-crop-cycle-data.service";
import {FarmCycleDataService} from "./dashboard/farms/services/plantCycle/farm-cycle-data.service";

export function localStorageSyncReducer(reducers: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync(
    {
      keys: ['auth'],
      rehydrate: true
    })(reducers);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    HttpClientModule,
    StoreModule.forRoot({ router: routerReducer},
      {
        metaReducers,
      }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EntityDataModule.forRoot(entityConfig),
    AuthModule,
    HotToastModule.forRoot({
      reverseOrder: true,
      dismissible: true,
      autoClose: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    entityDataService: EntityDataService,
    FarmsDataService: FarmsDataService,
    FarmCropDataService: FarmCropDataService,
    CropDataService: CropDataService,
    PlantCycleDataService: PlantCycleDataService,
    FarmCycleDataService: FarmCycleDataService,
    FarmCropCycleDataService: FarmCropCycleDataService,
    ChatService: ChatDataService,
    ) {
    entityDataService.registerServices({'Farms': FarmsDataService})
    entityDataService.registerServices({'FarmCrop': FarmCropDataService})
    entityDataService.registerServices({'Crop': CropDataService})
    entityDataService.registerServices({'FarmCycle': FarmCycleDataService})
    entityDataService.registerServices({'FarmCropCycle': FarmCropCycleDataService})
    entityDataService.registerServices({'PlantCycle': PlantCycleDataService})
    entityDataService.registerServices({'Chat': ChatService})
  }
}
