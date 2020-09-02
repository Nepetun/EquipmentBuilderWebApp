import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { HeroesService } from 'src/app/_services/heroes.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { IHeroCreator } from 'src/app/models/IHeroCreator';

@Component({
  selector: 'app-heroesEditorAdmin',
  templateUrl: './heroesEditorAdmin.component.html',
  styleUrls: ['./heroesEditorAdmin.component.scss']
})
export class HeroesEditorAdminComponent implements OnInit {
  public heroCreatorObject: IHeroCreator = {
    id: 0,
    heroName: '',
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
    abilityPower: 0,
    cooldownReduction: 0,
    armourPenetration: 0,
    armourPenetrationProc: 0,
    magicPenetration: 0,
    magicPenetrationProc: 0,
    lifeSteal: 0,
    apLifeSteal: 0,
    tenacity: 0,
    criticalChance: 0,
  };

  public heroCreator = this.fb.group({
    heroName: [
      '',
      [Validators.required, Validators.maxLength(20), Validators.minLength(3)],
    ],
    hitPoints: [
      200,
      [Validators.required, Validators.max(500), Validators.min(200)],
    ],
    hitPointsRegen: [
      1,
      [Validators.required, Validators.max(25), Validators.min(1)],
    ],
    mana: [1, [Validators.required, Validators.max(600), Validators.min(1)]],
    manaRegen: [
      1,
      [Validators.required, Validators.max(25), Validators.min(1)],
    ],
    range: [10, [Validators.required, Validators.max(600), Validators.min(10)]],
    attackDamage: [
      10,
      [Validators.required, Validators.max(90), Validators.min(10)],
    ],
    attackSpeed: [
      1,
      [Validators.required, Validators.max(2), Validators.min(1)],
    ],
    armour: [25, [Validators.required, Validators.max(70), Validators.min(25)]],
    magicResistance: [
      10,
      [Validators.required, Validators.max(70), Validators.min(10)],
    ],
    movementSpeed: [
      300,
      [Validators.required, Validators.max(380), Validators.min(300)],
    ],
    abilityPower: [
      0,
      [Validators.required, Validators.max(50), Validators.min(0)],
    ],
    cooldownReduction: [
      0,
      [Validators.required, Validators.max(10), Validators.min(0)],
    ],
    armourPenetration: [
      0,
      [Validators.required, Validators.max(10), Validators.min(0)],
    ],
    armourPenetrationProc: [
      0,
      [Validators.required, Validators.max(10), Validators.min(0)],
    ],
    magicPenetration: [
      0,
      [Validators.required, Validators.max(10), Validators.min(0)],
    ],
    magicPenetrationProc: [
      0,
      [Validators.required, Validators.max(10), Validators.min(0)],
    ],
    lifeSteal: [
      0,
      [Validators.required, Validators.max(10), Validators.min(0)],
    ],
    apLifeSteal: [
      0,
      [Validators.required, Validators.max(10), Validators.min(0)],
    ],
    tenacity: [0, [Validators.required, Validators.max(30), Validators.min(0)]],
    criticalChance: [
      0,
      [Validators.required, Validators.max(30), Validators.min(0)],
    ],
  });
  selectedHeroId: number;
  heroStats: IHeroCreator;

  get heroName() {
    return this.heroCreator.get('heroName');
  }
  get hitPoints() {
    return this.heroCreator.get('hitPoints');
  }
  get hitPointsRegen() {
    return this.heroCreator.get('hitPointsRegen');
  }
  get mana() {
    return this.heroCreator.get('mana');
  }
  get manaRegen() {
    return this.heroCreator.get('manaRegen');
  }
  get range() {
    return this.heroCreator.get('range');
  }
  get attackDamage() {
    return this.heroCreator.get('attackDamage');
  }
  get attackSpeed() {
    return this.heroCreator.get('attackSpeed');
  }
  get armour() {
    return this.heroCreator.get('armour');
  }
  get magicResistance() {
    return this.heroCreator.get('magicResistance');
  }
  get movementSpeed() {
    return this.heroCreator.get('movementSpeed');
  }
  get abilityPower() {
    return this.heroCreator.get('abilityPower');
  }
  get cooldownReduction() {
    return this.heroCreator.get('cooldownReduction');
  }
  get armourPenetration() {
    return this.heroCreator.get('armourPenetration');
  }
  get armourPenetrationProc() {
    return this.heroCreator.get('armourPenetrationProc');
  }
  get magicPenetration() {
    return this.heroCreator.get('magicPenetration');
  }
  get magicPenetrationProc() {
    return this.heroCreator.get('magicPenetrationProc');
  }
  get lifeSteal() {
    return this.heroCreator.get('lifeSteal');
  }
  get apLifeSteal() {
    return this.heroCreator.get('apLifeSteal');
  }
  get tenacity() {
    return this.heroCreator.get('tenacity');
  }
  get criticalChance() {
    return this.heroCreator.get('criticalChance');
  }

  constructor(
    private heroService: HeroesService,
    private fb: FormBuilder,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    // pobranie wybranego id ekwipunku
    this.heroService.selectedHeroId$.subscribe((res) => {
      this.selectedHeroId = res;
    });

    this.loadHeroData();
  }

  loadHeroData() {
    this.heroService.getHeroeData(this.selectedHeroId).subscribe((eq) => {
      this.heroStats = eq;
      this.loadHeroDataToForm();
    });
  }

  loadHeroDataToForm() {
    this.heroCreator.setValue({
      heroName: this.heroStats.heroName,
      hitPoints: this.heroStats.hitPoints,
      hitPointsRegen: this.heroStats.hitPointsRegen,
      mana: this.heroStats.mana,
      manaRegen: this.heroStats.manaRegen,
      range: this.heroStats.range,
      attackDamage: this.heroStats.attackDamage,
      attackSpeed: this.heroStats.attackSpeed,
      armour: this.heroStats.armour,
      magicResistance: this.heroStats.magicResistance,
      movementSpeed: this.heroStats.movementSpeed,
      abilityPower: this.heroStats.abilityPower,
      cooldownReduction: this.heroStats.cooldownReduction,
      armourPenetration: this.heroStats.armourPenetration,
      armourPenetrationProc: this.heroStats.armourPenetrationProc,
      magicPenetration: this.heroStats.magicPenetration,
      magicPenetrationProc: this.heroStats.magicPenetrationProc,
      lifeSteal: this.heroStats.lifeSteal,
      apLifeSteal: this.heroStats.apLifeSteal,
      tenacity: this.heroStats.tenacity,
      criticalChance: this.heroStats.criticalChance
    });
  }

  saveHero() {
    // tutaj dać zapis ekwipunku
    let heroToCreate: IHeroCreator = {
      id: 0,
      heroName: this.heroCreator.controls.heroName.value,
      hitPoints: +this.heroCreator.controls.hitPoints.value,
      hitPointsRegen: +this.heroCreator.controls.hitPointsRegen.value,
      mana: +this.heroCreator.controls.mana.value,
      manaRegen: +this.heroCreator.controls.manaRegen.value,
      range: +this.heroCreator.controls.range.value,
      attackDamage: +this.heroCreator.controls.attackDamage.value,
      attackSpeed: +this.heroCreator.controls.attackSpeed.value,
      armour: +this.heroCreator.controls.armour.value,
      magicResistance: +this.heroCreator.controls.magicResistance.value,
      movementSpeed: +this.heroCreator.controls.movementSpeed.value,
      abilityPower: +this.heroCreator.controls.abilityPower.value,
      cooldownReduction: +this.heroCreator.controls.cooldownReduction.value,
      armourPenetration: +this.heroCreator.controls.armourPenetration.value,
      armourPenetrationProc: +this.heroCreator.controls.armourPenetrationProc
        .value,
      magicPenetration: +this.heroCreator.controls.magicPenetration.value,
      magicPenetrationProc: +this.heroCreator.controls.magicPenetrationProc
        .value,
      lifeSteal: +this.heroCreator.controls.lifeSteal.value,
      apLifeSteal: +this.heroCreator.controls.apLifeSteal.value,
      tenacity: +this.heroCreator.controls.tenacity.value,
      criticalChance: +this.heroCreator.controls.criticalChance.value,
    };

    this.heroService.addHero(heroToCreate).subscribe(
      () => {
        this.alertify.success('ukończono tworzenie bohatera');
        this.router.navigate(['/manageAdminHeroes']);
      },
      (errror) => {
        this.alertify.error(errror);
      }
    );
  }

  cancel() {
    this.router.navigate(['/manageAdminHeroes']);
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
