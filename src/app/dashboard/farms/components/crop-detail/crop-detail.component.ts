import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import * as L from 'leaflet';

import {environment} from "../../../../../environments/environment";
import {zoomInAnimation} from "../../../../shared/animations";
import {CropInterface, FarmCropInterface} from "../../types/cropInterface";
import {FarmCropService} from "../../services/farmCrop/farm-crop.service";
import {CropService} from "../../services/crop/crop.service";
import {PlantCycleService} from "../../services/plantCycle/plant-cycle.service";
import {PlantCycleInterface} from "../../types/plantCycleInterface";
import jsPDF from 'jspdf';
import {NotificationService} from "../../../../shared/service/notification.service";
import { isDevMode } from '@angular/core';

//// Plant Cycle Stages
enum PlantingActivityTypes {
  Plough = 1,
  Uprooting = 2,
  Gaping = 3,
  Sowing = 4,
  Fertilizers = 5,
  Scouting = 6,
  Changing_the_Fly_Trap = 7,
  Picking = 8,
  Cleaning = 9,
  Packaging = 10,
  Grading = 11,
}


@Component({
  selector: 'app-crop-detail',
  templateUrl: './crop-detail.component.html',
  styleUrls: ['./crop-detail.component.scss'],
  animations: [zoomInAnimation]
})
export class CropDetailComponent implements OnInit, AfterViewInit {
  qrBaseUrl = '';
  farmCrop: FarmCropInterface | undefined;
  selectedFarmId: any;
  selectedFarmCropId: any;
  selectedCropId: number | undefined;

  latitude: any;
  longitude: any;

  selectedCropName: string | undefined;
  selectedCropCycleActivity: string | undefined;
  crops$: Observable<CropInterface[]> | undefined;
  plantingImages = <any>[];
  map: any;

  plantingActivities = {
    Plough: 1,
    Uprooting: 2,
    Gaping:3,
    Sowing: 4,
  }
  growthActivities = {
    Fertilizers:5,
    Scouting:6,
    Changing_the_Fly_Trap:7,

  };
  harvestActivities = {
    Picking:8,
    Cleaning:9,
    Packaging:10,
    Grading: 11,

  };
  keys = Object.keys;

  //// planting Stage
  plantingCycleStage: PlantCycleInterface[] = [];
  //// growth Stage
  growthCycleStage: PlantCycleInterface[] = [];
  //// harvest Stage
  harvestCycleStage: PlantCycleInterface[] = [];
  //// Selected CropCycle
  selectedCropCycleId: number | undefined;

  //// edit crop farm and crop farm stages
  editCropForm = this.fb.group({
    farm_id: ['', Validators.required],
    crop_id: ['', Validators.required],
    farm_crop_size: ['', Validators.required]
  });

  editPlantingCropStageForm = this.fb.group({
    plant_cycle_stage_id: ['', Validators.required],
    activity_type_id: ['', Validators.required],
    description: ['', Validators.required],
    farm_crop_id: ['', Validators.required],
    uploaded_images: ['', Validators.required],
  });

  myImages = <any>[];

  constructor(
    private fb: UntypedFormBuilder,
    private cropService: CropService,
    private farmCropService: FarmCropService,
    private cropCycleService: PlantCycleService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,) {
  }
  ngOnInit(): void {
    console.log('Another try farm detail page')
    this.selectedFarmId = this.route.snapshot.url[1].path;
    this.selectedFarmCropId = this.route.snapshot.params['farm_crop_id'];
    if (isDevMode() === true) {
      // this.qrBaseUrl = 'https://staging.avl.local:443/farm-crop-details/' + this.selectedFarmId + '/' + this.selectedFarmCropId
      this.qrBaseUrl = 'https://192.168.0.117:4100/farm-crop-details/' + this.selectedFarmId + '/' + this.selectedFarmCropId

    } else {
      this.qrBaseUrl = 'https://mobile.prodtrace.io/farm-crop-details/' + this.selectedFarmId + '/' + this.selectedFarmCropId
      // this.qrBaseUrl = 'https://mobile.prodtrace.io/api/v1/blockchain/farm-crop?farm_crop_id='
    }

    //// Get all crop cycles
    this.cropCycleService.getAll().subscribe({
      next: () => {},
      error: (error: any) => {
        console.error('Error Getting plant cycle', error);
      }
    });

    //// Get crop cycles
    this.cropCycleService.entities$.subscribe({
      next: (plantingStages: PlantCycleInterface[]) => {
        const stages = plantingStages.filter(plantingStage => plantingStage.farm_crop_id == this.selectedFarmCropId);
        //// Planting Stage
        this.plantingCycleStage = stages.filter(stage => stage.plant_cycle_stage_id == 1);

        //// Growth Stage
        this.growthCycleStage = stages.filter(stage => stage.plant_cycle_stage_id == 2);

        //// Harvest Stage
        this.harvestCycleStage = stages.filter(stage => stage.plant_cycle_stage_id == 3);
      },
      error: (error: any) => {
        console.error('Error Getting Filtered plant cycle', error);
      }
    })

    //// Get selected farm crop
    this.farmCropService.entities$.subscribe({
      next: (farmCrops: FarmCropInterface[]) => {
        this.farmCrop = farmCrops.find((farm) => farm.id == this.selectedFarmCropId)
        this.latitude = this.farmCrop?.farm?.latitude
        this.longitude = this.farmCrop?.farm?.longitude
      },
      error: (error:any) => {
        console.error('Error Getting Farm Crops', error);
      }
    });

    ///// Initialize crops if store is empty
    this.crops$ = this.cropService.entities$

    //// Patch farm crop size
    let update = {
      farm_id: this.selectedFarmId,
      crop_id: this.farmCrop?.crop?.id,
      farm_crop_size: this.farmCrop?.farm_crop_size
    }
    this.editCropForm.patchValue(update)
  }

  //// Initialize map
  public ngAfterViewInit(): void {
    this.loadMap();
  }

  //// Get form controls
  get cf() {
    return this.editPlantingCropStageForm!.controls;
  }
  //// Patch crop id and name to the update farm crop form
  setCrop(crop: any) {
    this.selectedCropId = crop.id
    this.selectedCropName = crop.name

    let update = {
      crop_id: this.selectedCropId,
    }
    this.editCropForm.patchValue(update)
    // console.log(this.editCropForm.value)
  }

  //// Edit Update farm crop stages and farm crops
  setCropCycle(cropActivity: string, cycleStage: number) {
    this.selectedCropCycleActivity = cropActivity
    // @ts-ignore
    const cycleActivity = PlantingActivityTypes[cropActivity]

    const update = {
      plant_cycle_stage_id: cycleStage,
      activity_type_id: cycleActivity,
      farm_crop_id: this.selectedFarmCropId
    }

    this.editPlantingCropStageForm.patchValue(update)
  }

  //// Get the selected images
  onFileChange(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.myImages.push(event.target.files[i]);
      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.plantingImages.push(reader.result as string);
      };
      reader.readAsDataURL(event.target.files[i]);
    }
  }

  //// Add Crop cycle
  editPlantingCropStage() {
    const formData = new FormData();

    this.myImages.forEach((image:any) => {
      formData.append(`uploaded_images`,image);
    });
    formData.append('plant_cycle_stage_id', this.cf['plant_cycle_stage_id'].value);
    formData.append('activity_type_id', this.cf['activity_type_id'].value);
    formData.append('description', this.cf['description'].value);
    formData.append('farm_crop_id', this.cf['farm_crop_id'].value);

    // @ts-ignore
    this.cropCycleService.add(formData).subscribe({
      next: (res) => {
        this.notificationService.showNotification('Crop Cycle added successfully', 'success');

      },
      error: (err) => {
        this.notificationService.showNotification('Error Adding Crop Cycle',
          'error');
      }
    })
    this.editPlantingCropStageForm.reset();
    this.selectedCropCycleActivity = undefined;
  }

  //// Update farm crop
  updateFarmCrop() {
    const farmCrop = {
      ...this.editCropForm.value,
      id: this.selectedFarmCropId
    }
    this.farmCropService.update(farmCrop).subscribe({
      next: (res) => {
        this.notificationService.showNotification('Farm Crop Updated successfully',
          'success');
      },
      error: (err) => {
        this.notificationService.showNotification('Error Updating Farm Crop',
          'error');
      }
    })
  }

  viewId(number: number) {
    this.selectedCropCycleId = number;
  }
  //////////////////////** MAP **/////////////////////////////
  private loadMap(): void {
    this.map = L.map('map').setView([1, 38], 8);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: environment.mapbox.accessToken,
    }).addTo(this.map);


    this.map.flyTo([this.latitude, this.longitude], 18)
    const icon = L.icon({
      iconUrl: 'assets/img/marker-icon.png',
      // shadowUrl: 'assets/images/marker-shadow.png',
      iconSize: [25, 25],
      popupAnchor: [13, 0],
    });

    // @ts-ignore
    const marker = L.marker([this.latitude, this.longitude], {icon}).bindPopup(`The ${this.farmCrop?.farm_name}`);
    marker.addTo(this.map);
  }

  //// Download/ Print qr as pdf
  downloadPDF() {
    let pdf = new jsPDF('p', 'mm', 'a4');
    let canvas = document.querySelector('qrcode canvas');
    // @ts-ignore
    let imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, 'PNG', 10, 10, 185, 185);
    pdf.save(`prodtrace-${this.farmCrop?.farm?.name}-${this.farmCrop?.crop?.name}.pdf`);
    this.notificationService.showNotification('Qr downloaded', 'success');
  }
}
