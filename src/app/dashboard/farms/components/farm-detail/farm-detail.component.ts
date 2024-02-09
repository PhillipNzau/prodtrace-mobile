import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {FarmCropInterface} from "../../types/cropInterface";
import {FarmCropService} from "../../services/farmCrop/farm-crop.service";

@Component({
  selector: 'app-farm-detail',
  templateUrl: './farm-detail.component.html',
  styleUrls: ['./farm-detail.component.scss']
})
export class FarmDetailComponent implements OnInit {
  farmCrops: any;
  loaded: any;
  selectedFarmId: any;
  selectedFarmName: string = '';

  constructor(
    private farmCropService: FarmCropService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.selectedFarmId = this.route.snapshot.params['id'];

    this.farmCropService.entities$.subscribe({
      next: (farmCrops:FarmCropInterface[]) => {
        this.farmCrops = farmCrops.filter((farmCrop:FarmCropInterface) => {
          return farmCrop.farm_id == this.selectedFarmId
        });
        this.selectedFarmName = this.farmCrops[0]?.farm.name;
        console.log('sdsds', this.selectedFarmName);
      }
    });
  }
  getSelectedFarmCrop(id: any) {
    this.farmCropService.getByKey(id)
  }
}
