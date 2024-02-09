import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SwiperModule} from "swiper/angular";
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import {SharedModule} from "../shared/shared.module";
import { TopHeaderComponent } from './components/top-header/top-header.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ServiceProcessComponent } from './components/service-process/service-process.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { GalleryComponent } from './components/gallery/gallery.component';
import { MessagesComponent } from './components/messages/messages.component';
import { SelectedMessagesComponent } from './components/selected-messages/selected-messages.component';
import {HotToastModule} from "@ngneat/hot-toast";


@NgModule({
    declarations: [
        DashboardComponent,
        HomeComponent,
        SettingsComponent,
        TopHeaderComponent,
        NotificationsComponent,
        ProfileComponent,
        ServiceProcessComponent,
        GalleryComponent,
        MessagesComponent,
        SelectedMessagesComponent
    ],
    exports: [
        TopHeaderComponent
    ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule,
    HotToastModule.forRoot()
  ]
})
export class DashboardModule { }
