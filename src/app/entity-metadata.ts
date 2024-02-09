import {EntityDataModuleConfig, EntityMetadataMap} from "@ngrx/data";

const entityMetadata: EntityMetadataMap = {
  Farms: {},
  Crop: {},
  FarmCrop: {},
  FarmCycle: {},
  FarmCropCycle: {},
  PlantCycle: {},
  Chat: {},
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata
}
