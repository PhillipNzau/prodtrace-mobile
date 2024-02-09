import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth.component';
import {AuthenticationComponent} from "./components/authentication/authentication.component";
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./state/auth.reducers";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./state/auth.effects";


@NgModule({
  declarations: [
    AuthComponent,
    AuthenticationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects])
  ],

})
export class AuthModule { }
