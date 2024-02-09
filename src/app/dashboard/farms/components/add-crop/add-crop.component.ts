import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {Observable} from "rxjs";

import {FarmInterface} from "../../types/farmInterface";
import {CropInterface} from "../../types/cropInterface";
import {CropService} from "../../services/crop/crop.service";
import {FarmService} from "../../services/farm.service";
import {FarmCropService} from "../../services/farmCrop/farm-crop.service";
import {NotificationService} from "../../../../shared/service/notification.service";

@Component({
  selector: 'app-add-crop',
  templateUrl: './add-crop.component.html',
  styleUrls: ['./add-crop.component.scss']
})
export class AddCropComponent implements OnInit {
  crops$: Observable<CropInterface[]> | undefined;

  fileName: string[] = [];
  selectedCropId: number | undefined;
  selectedCropName: string | undefined;
  selectedFarmId: any;
  selectedFarm: FarmInterface | undefined;
  isLoading: boolean = false;

  addCropForm = this.fb.group({
    farm_id: ['', Validators.required],
    crop_id: ['', Validators.required],
    farm_crop_size: ['', Validators.required]
  })

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cropService: CropService,
    private farmService: FarmService,
    private farmCropService: FarmCropService,
    private notificationService: NotificationService,

  ) {
  }

  ngOnInit(): void {
    this.selectedFarmId = this.route.snapshot.params['id'];

    ///// Initialize crops if store is empty
    this.crops$ = this.cropService.entities$

    this.farmService.entities$.subscribe({
      next: (farms:FarmInterface[]) => {
        this.selectedFarm = farms.find((farm:FarmInterface) => farm.id === this.selectedFarmId)
      }
    })
  }

  ///// Patch add crop farm form with crop id and farm id
  setCrop(crop: CropInterface) {
    this.selectedCropId = crop.id;
    this.selectedCropName = crop.name;

    let update = {
      crop_id: this.selectedCropId,
      farm_id: this.selectedFarmId,
    }
    this.addCropForm.patchValue(update);
    console.log(this.addCropForm.value)
  }

  ///// Add crop button action
  addFarmCrop() {
    this.isLoading = true;
    const cropData = {
      ...this.addCropForm.value
    }

    this.farmCropService.add(cropData).subscribe({
      next: () => {
        this.router.navigate(['/farms/selected-farm/', this.selectedFarmId]).then(() => {} );
        this.notificationService.showNotification('Farm Crop added successfully', 'success');
        this.isLoading = false;

      }, error: (err) => {
        this.notificationService.showNotification('Error Adding Farm crop', 'error' );
        console.log(' the err', err);
      }
    })
  }
}
