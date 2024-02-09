import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {logOutAction} from "../../../auth/state/auth.actions";
import {select, Store} from "@ngrx/store";
import {currentUserSelector, loggedInUserSelector} from "../../../auth/state/auth.selectors";

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit {
  @Input() currRouteName: string = '';
  @Input() farmName: string = '';
  refresh: string = '';
  exp: any;

  currRoute: string = '';
  userName: string | undefined;

  constructor(private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.currRoute = this.router.url;
    if (this.currRouteName === '') {
      this.currRouteName = this.router.url.split('/')[1]
    }
    this.refresh = localStorage.getItem('refresh') || '';

    this.store.pipe(select(loggedInUserSelector)).subscribe({
      next: ( user => this.userName = user?.get_full_name),
      error: ((error) => {
        console.log(error)
      })
    });
  }

  logOut() {
    this.store.dispatch(logOutAction({msg: this.refresh}))
  }
}
