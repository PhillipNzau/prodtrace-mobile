import {NgModule} from "@angular/core";
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {HotToastModule} from "@ngneat/hot-toast";
import { ReverserPipe } from './reverser.pipe';

@NgModule({
  declarations: [
    NavBarComponent,
    ReverserPipe
  ],
    exports: [
        NavBarComponent,
        ReverserPipe
    ],
  imports: [
    RouterLink,
    RouterLinkActive,
    HotToastModule.forRoot(),
  ]
})

export class SharedModule {}
