import { Component, OnInit } from '@angular/core';
import { IItems } from '../../models/IItems';
import {   FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ItemsService } from '../../_services/items.service';
import { HeroesService } from '../../_services/heroes.service';
import { IHero } from '../../models/IHero';
import { IAddEquipment } from '../../models/IAddEquipment';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { MyEquipmentService } from '../../_services/my-equipment.service';
import { AlertifyService } from '../../_services/alertify.service';
import { IEquipmentToGetStatistics } from '../../models/IEquipmentToGetStatistics';
import { StatisticsService } from '../../_services/statistics.service';
import { IStatisticEquipment } from '../../models/IStatisticEquipment';
import { IHeroCalculateGold } from '../../models/IHeroCalculateGold';


@Component({
  selector: 'app-equipment-editor',
  templateUrl: './equipment-editor.component.html',
  styleUrls: ['./equipment-editor.component.css']
})
export class EquipmentEditorComponent implements OnInit {
  public itemsArray: IItems[];
  public gold = 0;
  public heroPickedWithLvl: IHeroCalculateGold = {
    heroId: 0,
    heroLvl: 1
  };
  public statistic: IStatisticEquipment = {
    hitPoints: 0,
      hitPointsRegen: 0,
      mana: 0,
      manaRegen: 0,
      range: 0,
      attackDamage: 0,
      attackSpeed: 0,
      armour: 0,
      magicResistance: 0,
      movementSpeed: 0,
      abillityPower: 0,
      cooldownReduction: 0,
      armourPenetration: 0,
      armourPenetrationProc: 0,
      magicPenetration: 0,
      magicPenetrationProc: 0,
      lifeSteal: 0,
      apLifeSteal: 0,
      tenacity: 0,
      criticalChance: 0,
      additionalPotionPower: 0,
      additionalHitPointsPerHit: 0,
      additionalGoldPerTenSec: 0,
      description: '',
      totalCost: 0,
  };
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
  public selectedEquipmentId: number;

  public lvlArray: Array<number>;
  private eqCreatedStatistic: IEquipmentToGetStatistics;
  public eqToGet: IAddEquipment;
  eqInformation = this.fb.group(
    {
      hero: [
        '', [Validators.required]
      ],
      heroLvl: [
        1
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
    private statiscitcsEquipment: StatisticsService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.lvlArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  }

  ngOnInit() {

    // pobranie wybranego id ekwipunku
    this.equipmentService.selectedEquipmentId$.subscribe((res) => {
      this.selectedEquipmentId = res;
    });

    this.loadHeroes();
    // this.loadItems();
    this.loadUserId();

    this.eqCreatedStatistic = {
      heroLvl: 0,
      heroId: 0,
      firtItemId: 0,
      secondItemId: 0,
      thirdItemId: 0,
      fourthItemId: 0,
      fifthItemId: 0,
      sixthItemId: 0
    };


    // pobranie ekwipunku
    this.equipmentService.getEquipmentById(this.selectedEquipmentId).subscribe((eq) => {
      this.heroPickedWithLvl.heroLvl = eq.heroLvl;
      this.loadItems();
      this.eqToGet = eq;
      this.eqCreatedStatistic = eq;
      this.fifthItemId = eq.firtItemId;
      this.secondItemId = eq.secondItemId;
      this.thirdItemId = eq.thirdItemId;
      this.fourthItemId = eq.fourthItemId;
      this.fifthItemId = eq.fifthItemId;
      this.sixthItemId = eq.sixthItemId;
      this.loadControlsFromEquipment();
      this.eqCreatedStatistic.heroLvl = eq.heroLvl;
      this.getGold();
      this.reloadStatistics();
    });

    
    // ustawienie wybranego ekwipunku na komponentach
    // this.loadControlsFromEquipment();
  }

  loadControlsFromEquipment() {
    this.eqInformation.setValue({
      hero: this.eqToGet.heroId,
      heroLvl: this.eqToGet.heroLvl,
      equipmentName: this.eqToGet.eqName,
      firstItem: this.eqToGet.firtItemId,
      secondItem: this.eqToGet.secondItemId,
      thirdItem: this.eqToGet.thirdItemId,
      forthItem: this.eqToGet.fourthItemId,
      fifthItem: this.eqToGet.fifthItemId,
      sixthItem: this.eqToGet.sixthItemId
    });
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

  updateEquipment() {
    // tutaj dać zapis ekwipunku
    let eqToCreate: IAddEquipment = {
      eqName: this.eqInformation.controls.equipmentName.value,
      heroId: +this.eqInformation.controls.hero.value,
      heroLvl: +this.eqInformation.controls.heroLvl.value,
      userId: this.userId, // this.authService.userId,
      firtItemId: +this.eqInformation.controls.firstItem.value,
      secondItemId: +this.eqInformation.controls.secondItem.value,
      thirdItemId: +this.eqInformation.controls.thirdItem.value,
      fourthItemId: +this.eqInformation.controls.forthItem.value,
      fifthItemId: +this.eqInformation.controls.fifthItem.value,
      sixthItemId: +this.eqInformation.controls.sixthItem.value,
      gameId: 1
    };

    console.log(eqToCreate);

    this.equipmentService.updateEquipment(eqToCreate, this.selectedEquipmentId).subscribe(
      () => {
        this.alertify.success('ukończono modyfikacje ekwipunku');
        this.router.navigate(['/myEquipments']);
      },
      errror => {
        this.alertify.error(errror);
      }
    );

  }

  cancel() {
    this.router.navigate(['/myEquipments']);
  }

  heroChange(heroId: number) {
    console.log(heroId);
    this.eqCreatedStatistic.heroId = heroId;
    console.log(this.eqCreatedStatistic.heroId);
    // this.getGold(); /*wyliczenie dostępnego złota na danym poziomie*/
    this.reloadStatistics();
    // po wyborze dac strzal do api z ekwipunkiem
  }

  lvlChange(heroLvl: number) {
    console.log(heroLvl);
    this.eqCreatedStatistic.heroLvl = heroLvl;
    this.heroPickedWithLvl.heroLvl = heroLvl;
    this.reloadStatistics();
    this.getGold(); /*wyliczenie dostępnego złota na danym poziomie*/
    console.log(this.eqCreatedStatistic.heroLvl);
  }

  firstItemChange(itemId: number) {
    console.log(itemId);
    this.eqCreatedStatistic.firtItemId = itemId;
    this.reloadStatistics();
    console.log(this.eqCreatedStatistic.firtItemId);
  }

  secondItemChange(itemId: number) {
    console.log(itemId);
    this.eqCreatedStatistic.secondItemId = itemId;
    this.reloadStatistics();
    console.log(this.eqCreatedStatistic.secondItemId);
  }

  thirdItemChange(itemId: number) {
    console.log(itemId);
    this.eqCreatedStatistic.thirdItemId = itemId;
    this.reloadStatistics();
    console.log(this.eqCreatedStatistic.thirdItemId);
  }

  forthItemChange(itemId: number) {
    console.log(itemId);
    this.eqCreatedStatistic.fourthItemId = itemId;
    this.reloadStatistics();
    console.log(this.eqCreatedStatistic.fourthItemId);
  }

  fifthItemChange(itemId: number) {
    console.log(itemId);
    this.eqCreatedStatistic.fifthItemId = itemId;
    this.reloadStatistics();
    console.log(this.eqCreatedStatistic.fifthItemId);
  }

  sixthItemChange(itemId: number) {
    console.log(itemId);
    this.eqCreatedStatistic.sixthItemId = itemId;
    this.reloadStatistics();
    console.log(this.eqCreatedStatistic.sixthItemId);
  }

  // metoda która będzie miała eqCreatetedStatistics
  reloadStatistics() {
    this.statiscitcsEquipment.getStatistics(this.eqCreatedStatistic).subscribe((statistic) => {
      this.statistic = statistic;
    });
  }

  getGold() {
    this.statiscitcsEquipment.getGold(this.heroPickedWithLvl).subscribe((gold) => {
      this.gold = gold;
    });
  }


  filterItemsOfType() {
    if (this.itemsArray) {
      return this.itemsArray.filter(x => x.minHeroLvl <= this.heroPickedWithLvl.heroLvl);
    }
  }


}
