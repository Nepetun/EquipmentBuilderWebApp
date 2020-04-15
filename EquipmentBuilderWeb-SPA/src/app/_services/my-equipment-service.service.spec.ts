/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyEquipmentService } from './my-equipment.service';

describe('Service: MyEquipmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyEquipmentService]
    });
  });

  it('should ...', inject([MyEquipmentService], (service: MyEquipmentService) => {
    expect(service).toBeTruthy();
  }));
});
