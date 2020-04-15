import { Component, OnInit } from '@angular/core';
import { IItems } from '../models/IItems';
import {   FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ItemsService } from '../_services/items.service';
import { HeroesService } from '../_services/heroes.service';
import { IHero } from '../models/IHero';
import { IAddEquipment } from '../models/IAddEquipment';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { MyEquipmentService } from '../_services/my-equipment.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css'],
})


export class EquipmentComponent implements OnInit {
  public itemsArray: IItems[];
  public heroesArray: IHero[];
  public userId: number;
  public eqName: string;
  public heroId: number;
  public firtItemId: number;
  public secondItemId: number;
  public thirdItemId: number;
  public fourthItemId: number;
  public fifthItemId: number;
  public sixthItemId: number;

  eqInformation = this.fb.group(
    {
      hero: [
        '', [Validators.required]
      ],
      equipmentName: [
        '',
        [Validators.required,
        Validators.maxLength(20),
        Validators.minLength(5)]
      ],
      firstItem: [
        '', Validators.required
      ],
      secondItem: [
        '' // , Validators.required
      ],
      thirdItem : [
        '' // , Validators.required
      ],
      forthItem: [
        '' // , Validators.required
      ],
      fifthItem: [
        '' // , Validators.required
      ],
      sixthItem: [
        '' // , Validators.required
      ]
    });

    get equipmentName() {
      return this.eqInformation.get('equipmentName');
    }
    get hero() {
      return this.eqInformation.get('hero');
    }
    get firstItem() {
      return this.eqInformation.get('firstItem');
    }



  constructor(
    private itemService: ItemsService,
    private heroesService: HeroesService,
    private authService: AuthService,
    private equipmentService: MyEquipmentService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadHeroes();
    this.loadItems();
    this.loadUserId();
  }

  loadHeroes() {
    this.heroesService.getHeroes().subscribe((heroes) => {
      this.heroesArray = heroes;
    });
  }

  loadItems() {
    this.itemService.getItems().subscribe((items) => {
      this.itemsArray = items;
    });
  }

  loadUserId() {
    let userIdString = this.authService.getUserIdByUserName();
    this.userId = +userIdString;
    console.log(this.userId);
  }

  saveEquipment() {
    // tutaj dać zapis ekwipunku
    let eqToCreate: IAddEquipment = {
      eqName: this.eqInformation.controls.equipmentName.value,
      heroId: +this.eqInformation.controls.hero.value,
      userId: this.userId, // this.authService.userId,
      firtItemId: +this.eqInformation.controls.firstItem.value,
      secondItemId: +this.eqInformation.controls.secondItem.value,
      thirdItemId: +this.eqInformation.controls.thirdItem.value,
      fourthItemId: +this.eqInformation.controls.forthItem.value,
      fifthItemId: +this.eqInformation.controls.fifthItem.value,
      sixthItemId: +this.eqInformation.controls.sixthItem.value
    };

    console.log(eqToCreate);

    this.equipmentService.addEquipment(eqToCreate).subscribe(
      () => {
        this.alertify.success('ukończono tworzenie ekwipunku');
        this.router.navigate(['/myEquipments']);
      },
      errror => {
        this.alertify.error(errror);
      }
    );

  }

  cancel() {
    this.router.navigate(['/home']);
  }
}
