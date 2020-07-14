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
import { Component, OnInit } from '@angular/core';
import { IComment } from 'src/app/models/IComment';
import { CommentService } from 'src/app/_services/comment.service';
import { IAddComment } from '../../models/IAddComment';
import { LikeService } from 'src/app/_services/like.service';
import { ILike } from 'src/app/models/ILike';

@Component({
  selector: 'app-equipment-review',
  templateUrl: './equipment-review.component.html',
  styleUrls: ['./equipment-review.component.css']
})
export class EquipmentReviewComponent implements OnInit {
  public itemsArray: IItems[];
  public commentArray: IComment[];
  public gold = 0;
  public readonly = true;
  public userComment = '';
  public userName = '';
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
  isAdmin: boolean = false;
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

    commentForm = this.fb.group({
      commentUserInput: [
        '',
        [Validators.required,
        Validators.maxLength(1000),
        Validators.minLength(5)]
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
    get commentUserInput() {
      return this.eqInformation.get('commentUserInput');
    }



  constructor(
    private itemService: ItemsService,
    private heroesService: HeroesService,
    private authService: AuthService,
    private equipmentService: MyEquipmentService,
    private statiscitcsEquipment: StatisticsService,
    private commentService: CommentService,
    private alertify: AlertifyService,
    private likeService: LikeService,
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


    this.userName = this.authService.getUserName();

    this.loadHeroes();
    this.loadItems();
    this.loadUserId();
    this.authService.checkIsAdmin(this.userId).subscribe((res) => { this.isAdmin = res; });

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
      this.heroPickedWithLvl.heroLvl = eq.heroLvl;
      this.getGold();
      this.reloadStatistics();
    });

    this.eqInformation.disable();

    // pobranie komentarzy
    this.commentService.getCommentForEquipmentById(this.selectedEquipmentId).subscribe((res) => {
      this.commentArray = res;
    });

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

  cancel() {
    this.router.navigate(['/myEquipments']);
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

  addComment() {
    if (this.commentForm.controls.commentUserInput.value.trim() !== '') {
      let commentObject: IAddComment = {
        equipmentId: this.selectedEquipmentId,
        commentString: this.commentForm.controls.commentUserInput.value.trim(),
        userId: this.userId
      };
      this.commentService.addComment(commentObject);
      this.commentService.getCommentForEquipmentById(this.selectedEquipmentId).subscribe((res) => {
        this.commentArray = res;
      });
      this.commentForm.setValue({commentUserInput: ''});
      this.alertify.success('Pomyślnie dodano komentarz - po przeładowaniu danych, bedzie widoczny');
    }
  }

  removeComment(commentId: number) {
    console.log(commentId);
    this.commentService.deleteComment(commentId);
    this.commentService.getCommentForEquipmentById(this.selectedEquipmentId).subscribe((res) => {
      this.commentArray = res;
    });
    // jezeli po przeladowaniu nie znaleziono komentarza - oznacza usuniety
    if ( this.commentArray.find( x => x.commentId === commentId) ) {
      this.alertify.success('Pomyślnie usunięto komentarz - po przeładowaniu danych, bedzie widoczny');
    }
  }


  likeEquipment() {
    let ilike: ILike = {
      userId: this.userId,
      equipmentId: this.selectedEquipmentId
    };
    this.likeService.addLike(ilike);
    this.commentService.getCommentForEquipmentById(this.selectedEquipmentId).subscribe((res) => {
      this.commentArray = res;
    });
    // this.alertify.success('Pomyślnie polubiono ekwipunek - po przeładowaniu danych, bedzie widoczny');
  }


}
