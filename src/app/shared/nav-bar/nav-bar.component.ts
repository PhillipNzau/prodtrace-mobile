import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/service/auth.service";
import {Store} from "@ngrx/store";
import {logOutAction} from "../../auth/state/auth.actions";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  refresh: string = '';
  exp: any;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.refresh = localStorage.getItem('refresh') || '';
  }

  logOut() {
    this.store.dispatch(logOutAction({msg: this.refresh}))
  }
}
