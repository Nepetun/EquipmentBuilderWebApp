/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyEquipmentServiceService } from './my-equipment-service.service';

describe('Service: MyEquipmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyEquipmentServiceService]
    });
  });

  it('should ...', inject([MyEquipmentServiceService], (service: MyEquipmentServiceService) => {
    expect(service).toBeTruthy();
  }));
});
