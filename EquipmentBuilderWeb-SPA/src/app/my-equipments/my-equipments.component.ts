import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { MyEquipmentService } from '../_services/my-equipment.service';
import { StatisticsService } from '../_services/statistics.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myEquipments',
  templateUrl: './my-equipments.component.html',
  styleUrls: ['./my-equipments.component.css']
})
export class MyEquipmentsComponent implements OnInit {


  constructor(
    private authService: AuthService,
    private equipmentService: MyEquipmentService,
    private statiscitcsEquipment: StatisticsService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
  }

  createEquipment() {
    this.router.navigate(['/home']);
  }

  editSelectedEquipment() {
    this.router.navigate(['/editEquipment']);
  }
}
