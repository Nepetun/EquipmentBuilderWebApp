import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { MyEquipmentService } from '../_services/my-equipment.service';
import { StatisticsService } from '../_services/statistics.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IEquipments } from '../models/IEquipments';
import { Pagination } from '../models/pagination';
import { Observable } from 'rxjs';
import { IEquipmentFilter } from '../models/Filters/IEquipmentFilter';

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
  itemsPerPage = 2;
  loading$: Observable<boolean>;
  rotate = true;
  public lvlArray: Array<number>;
  public pagination: Pagination = { currentPage: 1, itemsPerPage: 3, totalItems: 3, totalPages: 2};
  formFilter = this.fb.group(
    {
      heroName: [
        '',
        [Validators.maxLength(20)]
      ],
      equipmentName: [
        '',
        [Validators.maxLength(20)]
      ],
      heroLvlFrom: [
        1
      ],
      heroLvlTo: [
        18
      ],
      userName: [
        '',
        [Validators.maxLength(20)]
      ]
    });
    equipmentFilter: IEquipmentFilter = {
      equipmentNameLike: '',
      userNameLike: '',
      heroNameLike: '',
      heroLvlFrom: 1,
      heroLvlTo: 18
    };


  constructor(
    private authService: AuthService,
    private equipmentService: MyEquipmentService,
    private statiscitcsEquipment: StatisticsService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.lvlArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    this.loadUserId();
    this.userName = this.authService.getUserName();

    this.loading$ = this.equipmentService.loading$;

    this.reloadValues();
    /*
    this.equipmentService.loadEquipments(this.userId, this.pagination);
    this.equipmentService.pagination$.subscribe((value) => (this.pagination = value));
    this.equipmentService.equipments$.subscribe((eq) => (this.equipments = eq));
*/
    /*this.equipmentService.getEquipments(this.userId, this.pagination.currentPage, this.pagination.itemsPerPage).subscribe((eq) => {
    this.equipments = eq.result;
    });
    this.equipmentService.pagination$.subscribe((value) => (this.pagination = value));*/
  }

  reloadValues() {
    this.setFilterFromForm();
    this.equipmentService.loadEquipments(this.userId, this.pagination, this.equipmentFilter);
    this.equipmentService.pagination$.subscribe((value) => (this.pagination = value));
    this.equipmentService.equipments$.subscribe((eq) => (this.equipments = eq));
  }

  setFilterFromForm() {
    if (this.formFilter.controls.heroName) {
      this.equipmentFilter.heroNameLike = this.formFilter.controls.heroName.value;
    }
    if (this.formFilter.controls.userName) {
      this.equipmentFilter.userNameLike = this.formFilter.controls.userName.value;
    }
    if (this.formFilter.controls.equipmentName) {
      this.equipmentFilter.equipmentNameLike = this.formFilter.controls.equipmentName.value;
    }
    this.equipmentFilter.heroLvlFrom = this.formFilter.controls.heroLvlFrom.value;
    this.equipmentFilter.heroLvlTo = this.formFilter.controls.heroLvlTo.value;
  }

  resetFilter() {
    this.equipmentFilter = {
      equipmentNameLike: '',
      userNameLike: '',
      heroNameLike: '',
      heroLvlFrom: 1,
      heroLvlTo: 18
    };
    this.setFormFromFilter();
  }

  setFormFromFilter() {
    this.formFilter.setValue(
      {
      heroName: this.equipmentFilter.heroNameLike,
      equipmentName: this.equipmentFilter.equipmentNameLike,
      heroLvlFrom: this.equipmentFilter.heroLvlFrom,
      heroLvlTo: this.equipmentFilter.heroLvlTo,
      userName: this.equipmentFilter.userNameLike
      });

  }

  loadUserId() {
    let userIdString = this.authService.getUserIdByUserName();
    this.userId = +userIdString;
    console.log(this.userId);
  }

  filterLvlHigherThanLvlFrom() {
    if (this.lvlArray) {
      return this.lvlArray.filter(x => x >= this.formFilter.controls.heroLvlFrom.value);
    }
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


  // usuwanie ekwipunku - jeżeli jest nasz
  removeEquipment() {
    this.equipmentService.deleteEquipment(this.equipmentId);
    this.equipmentService.pagination$.subscribe((value) => (this.pagination = value));

    this.equipmentService.getEquipments(this.userId, this.pagination.currentPage, this.pagination.itemsPerPage).subscribe((eq) => {
      this.equipments = eq.result;
    });
    this.router.navigate(['/myEquipments']);
  }


  pageChanged(event: any) {
    this.pagination.currentPage = Number(event.page);
    this.equipmentService.pagination$.subscribe((value) => (this.pagination = value));

    this.equipmentService.getEquipments(this.userId, this.pagination.currentPage, this.pagination.itemsPerPage).subscribe((eq) => {
      this.equipments = eq.result;
    });
  }
}
