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
import { GamesService } from 'src/app/_services/games.service';
import { IGames } from 'src/app/models/IGames';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css'],
})


export class EquipmentComponent implements OnInit {
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

  public lvlArray: Array<number>;
  private eqCreatedStatistic: IEquipmentToGetStatistics;

  eqInformation = this.fb.group(
    {
      hero: [
        '', [Validators.required]
      ],
      gameId: [
        1
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
  wasChangedGame: boolean = false;
  gameId: number=1;

    get equipmentName() {
      return this.eqInformation.get('equipmentName');
    }
    get hero() {
      return this.eqInformation.get('hero');
    }
    get firstItem() {
      return this.eqInformation.get('firstItem');
    }

    public gamesArray: IGames[];


  constructor(
    private itemService: ItemsService,
    private heroesService: HeroesService,
    private authService: AuthService,
    private equipmentService: MyEquipmentService,
    private statiscitcsEquipment: StatisticsService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private gameService: GamesService,
    private router: Router
  ) {
    this.lvlArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  }

  ngOnInit() {
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

    this.gameService.getGamesToLookUp().subscribe((games) => {
      this.gamesArray = games;
    });
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
      heroLvl: +this.eqInformation.controls.heroLvl.value,
      userId: this.userId, // this.authService.userId,
      firtItemId: +this.eqInformation.controls.firstItem.value,
      secondItemId: +this.eqInformation.controls.secondItem.value,
      thirdItemId: +this.eqInformation.controls.thirdItem.value,
      fourthItemId: +this.eqInformation.controls.forthItem.value,
      fifthItemId: +this.eqInformation.controls.fifthItem.value,
      sixthItemId: +this.eqInformation.controls.sixthItem.value,
      gameId: +this.eqInformation.controls.gameId.value
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
    this.router.navigate(['/myEquipments']);
  }

  heroChange(heroId: number) {
    console.log(heroId);
    this.eqCreatedStatistic.heroId = heroId;
    console.log(this.eqCreatedStatistic.heroId);
    this.getGold(); /*wyliczenie dostępnego złota na danym poziomie*/
    this.reloadStatistics();
    // po wyborze dac strzal do api z ekwipunkiem
  }

  gameChange(gameId: number) {
    this.gameId = gameId;
    this.wasChangedGame = true;
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
    return this.itemsArray.filter(x => x.minHeroLvl <= this.heroPickedWithLvl.heroLvl && x.gameName === this.gamesArray.find( x=> x.id === +this.gameId).gameName);
  }

  filterHeroesOfType() {
    return this.heroesArray.filter(x => x.gameName === this.gamesArray.find( x=> x.id === +this.gameId).gameName);
  }
}
