import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { MyEquipmentService } from '../_services/my-equipment.service';
import { StatisticsService } from '../_services/statistics.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IEquipments } from '../models/IEquipments';

@Component({
  selector: 'app-myEquipments',
  templateUrl: './my-equipments.component.html',
  styleUrls: ['./my-equipments.component.css']
})
export class MyEquipmentsComponent implements OnInit {
  public userId: number;
  equipments: IEquipments[];
  selectedCardIndex = -1;
  selectedEq = false;
  selectedMyEq = false;
  userName = '';
  equipmentId = -1;

  constructor(
    private authService: AuthService,
    private equipmentService: MyEquipmentService,
    private statiscitcsEquipment: StatisticsService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserId();
    this.userName = this.authService.getUserName();
    this.equipmentService.getEquipments(this.userId, 1, 10).subscribe((eq) => {
      this.equipments = eq.result;
    });
  }

  loadUserId() {
    let userIdString = this.authService.getUserIdByUserName();
    this.userId = +userIdString;
    console.log(this.userId);
  }

  createEquipment() {
    this.router.navigate(['/equipment']);
  }

  editSelectedEquipment() {
    this.router.navigate(['/equipmentEditor']);
  }

  showPickedEquipment() {
    this.router.navigate(['/equipmentReview']);
  }

  higlightSelected(index, equipmentId: number, userName: string) {
    this.selectedCardIndex = index;
    this.equipmentId = equipmentId;
    this.selectedEq = true;
    if (userName === this.userName) {
      this.selectedMyEq = true;
    } else {
      this.selectedMyEq = false;
    }
    this.setFocusedEquipmentId(equipmentId);
  }

  setFocusedEquipmentId(id: number) {
    this.equipmentService.setSelectedEquipmentId(id);
  }

}
