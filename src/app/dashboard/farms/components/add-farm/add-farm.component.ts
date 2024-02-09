import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {select, Store} from "@ngrx/store";
import {Router} from "@angular/router";

import {CurrentUserInterface} from "../../../../shared/types/currentUser.interface";
import {loggedInUserSelector} from "../../../../auth/state/auth.selectors";
import {environment} from "../../../../../environments/environment";
import {FarmInterface} from "../../types/farmInterface";
import {FarmService} from "../../services/farm.service";
import {debounceTime} from "rxjs";
import {NotificationService} from "../../../../shared/service/notification.service";

@Component({
  selector: 'app-add-farm',
  templateUrl: './add-farm.component.html',
  styleUrls: ['./add-farm.component.scss']
})
export class AddFarmComponent implements OnInit {
  userLocationUrl = environment.userLocation;
  searchedLocation: string = '';
  loc = []
  locationRes: any;
  isSearchedResults: boolean = false;

  fileName: string[] = [];
  currentUser: CurrentUserInterface | null | undefined;
  isLoading: boolean = false;

  addFarmForm = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],
    size: ['', [
      Validators.required,
    ]],
    location: ['', [
      Validators.required,
    ]],
    latitude: [''],
    longitude: [''],
    county_id: [''],
    user_id: ['', [
      Validators.required,
    ]]
  })
  selectedLocation: any;

  constructor(
    private http: HttpClient,
    private farmsService: FarmService,
    private route: Router,
    private store: Store,
    private fb: UntypedFormBuilder,
    private notificationService: NotificationService,
    ) {
  }

  ngOnInit(): void {
    this.initializeValues();
    this.patchValue();
  }

  patchValue() {
    let update = {
      user_id: this.currentUser?.id,
      county_id: 2,
    }
    this.addFarmForm.patchValue(update)
  }

  initializeValues(): void {
    this.store.pipe(select(loggedInUserSelector)).subscribe({
      next: (user => {
        this.currentUser = user
      }),
      error: (err) => {
        console.log(err)
      }
    })
  }

  //// Get location from search
  getLocation() {
    this.http.get(this.userLocationUrl + this.searchedLocation).subscribe({
      next: (res) => {
        this.locationRes = res;
        this.isSearchedResults = true;
        // console.log(' Search res', res);
      },
      error: err => {
        console.log('Error', err)
      }
    })

  }

  //// Set location details
  setFarmLocation(loc: any) {
    this.selectedLocation = loc.display_name;
    let update = {
      latitude: loc.lat,
      longitude: loc.lon,
      location: loc.display_name
    }
    this.addFarmForm.patchValue(update)
    this.isSearchedResults = false;
  }

  //// Clear search location form
  onClearInput() {
    this.searchedLocation = '';
    this.isSearchedResults = false;
  }

  //// Add farm
  addFarm() {
    this.isLoading = true;
    const farmData: FarmInterface = {
      ...this.addFarmForm.value
    };
    this.farmsService.add(farmData).subscribe({
      next: () => {
        this.route.navigate(['/farms']).then(() => {} );
        this.notificationService.showNotification('Farm added successfully', 'success');
        this.isLoading = false;
      },
      error: err => {
        this.notificationService.showNotification("Error adding farm", "error");
        console.log('error updating farm', err);
      }
    })
  }

  onKeyUp() {
    if (this.searchedLocation.length >= 4) {
      this.http.get(this.userLocationUrl + this.searchedLocation)
        .pipe(debounceTime(15000))
        .subscribe({
          next: (res) => {
            this.locationRes = res;
            this.isSearchedResults = true;
            console.log(' Search res', res);
          },
          error: err => {
            console.log('Error', err)
          }
        })
    }

  }
}
