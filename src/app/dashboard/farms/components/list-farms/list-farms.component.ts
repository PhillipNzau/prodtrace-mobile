import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

import {FarmInterface} from "../../types/farmInterface";
import {FarmService} from "../../services/farm.service";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {NotificationService} from "../../../../shared/service/notification.service";

@Component({
  selector: 'app-list-farms',
  templateUrl: './list-farms.component.html',
  styleUrls: ['./list-farms.component.scss']
})
export class ListFarmsComponent implements OnInit {
  farms$: Observable<FarmInterface[]> | any;
  loggedUser = JSON.parse(localStorage.getItem('auth') || '') ;
  userId: string = '';
  userTypeId: string = '';
  selectedFarm: FarmInterface | undefined;
  selectedFarmId: number | undefined;

  editFarmForm = this.fb.group({
    name: [''],
    size: [''],
  })


  constructor(
    private store: Store,
    private farmsService: FarmService,
    private fb: UntypedFormBuilder,
    private notificationService: NotificationService,

    ) { }

  ngOnInit(): void {
    this.userId = this.loggedUser.loggedInUser.id
    this.userTypeId = this.loggedUser.loggedInUser.user_type_id
    this.farmsService.entities$.subscribe({
      next: (farms: any) => {
        if (this.userTypeId == '3') {
          this.farms$ = farms
        } else {
          this.farms$ = farms.filter((farm: any) =>{
            return farm.user_id === this.userId
          })
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  // Delete Farm
  deleteFarm(id: number) {
  }

  getFarm(id: number) {
    this.selectedFarmId = id;
    this.farmsService.entities$.subscribe({
      next: (selectedFarm: FarmInterface[]) => {
        this.selectedFarm = selectedFarm.find((x) => x.id == id)

        let update = {
          name: this.selectedFarm?.name,
          size: this.selectedFarm?.size
        }
        this.editFarmForm.patchValue(update)
      }
    });
  }

  updateFarm() {
    const farm = {
      ...this.editFarmForm.value,
      id: this.selectedFarmId
    }
    this.farmsService.update(farm).subscribe({
      next: (farm: FarmInterface) => {
        this.notificationService.showNotification('Farm Updated successfully', 'success');
      },
      error: (error: any) => {
        this.notificationService.showNotification('Error Updating Farm', 'error' );
        console.log('Error updating farm', error);
      }
    })
  }
}
