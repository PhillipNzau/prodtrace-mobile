import { EntityDataModuleConfig, EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Farms: {},
  Crop: {},
  FarmCrop: {},
  FarmCycle: {},
  FarmCropCycle: {},
  PlantCycle: {},
  Chat: {},
  Ppu: {},
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
};
