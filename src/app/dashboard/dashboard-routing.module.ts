import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {NotificationsComponent} from "./components/notifications/notifications.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {ServiceProcessComponent} from "./components/service-process/service-process.component";
import {FarmsResolver} from "./farms/state/farms-state/farms.resolver";
import {CropsResolver} from "./farms/state/crop-state/crops.resolver";
import {FarmCropResolver} from "./farms/state/farm-crop-state/farm-crop.resolver";
import {GalleryComponent} from "./components/gallery/gallery.component";
import {ChatsResolver} from "./farms/state/chat-state/chats.resolver";
import {MessagesComponent} from "./components/messages/messages.component";
import {SelectedMessagesComponent} from "./components/selected-messages/selected-messages.component";
import {CropCycleResolver} from "./farms/state/crop-cycle-state/crop-cycle.resolver";

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    resolve: {
      farms: FarmsResolver,
      crops: CropsResolver,
      farmCrops: FarmCropResolver,
      chats: ChatsResolver,
      cropCycle: CropCycleResolver,
    }
  },
  {path: 'settings', component: SettingsComponent},
  {
    path: 'farms',
    resolve: {
      farms: FarmsResolver,
      crops: CropsResolver,
      farmCrops: FarmCropResolver,
      chats: ChatsResolver
    },
    loadChildren: () => import('./farms/farms.module').then(m => m.FarmsModule,)
  },
  {
    path: 'regulators',
    loadChildren: () => import('./regulators/regulators.module').then(m => m.RegulatorsModule)
  },

  {path: 'notifications', component: NotificationsComponent},

  {path: 'service-progress/:id', component: ServiceProcessComponent},
  {path: 'profile', component: ProfileComponent},
  {
    path: 'gallery',
    resolve: {
      farms: FarmsResolver,
      crops: CropsResolver,
      farmCrops: FarmCropResolver,
      chats: ChatsResolver
    },
    component: GalleryComponent
  },
  {
    path: 'messages',
    component: MessagesComponent,
    resolve: {
      farms: FarmsResolver,
      crops: CropsResolver,
      farmCrops: FarmCropResolver,
      chats: ChatsResolver
    }
  },
  {
    path: 'messages/:id',
    component: SelectedMessagesComponent,
    resolve: {
      farms: FarmsResolver,
      crops: CropsResolver,
      farmCrops: FarmCropResolver,
      chats: ChatsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
