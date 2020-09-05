import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/_services/items.service';
import { Validators, FormBuilder } from '@angular/forms';
import { IItemCreate } from 'src/app/models/IItemCreate';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-itemCreatorAdmin',
  templateUrl: './itemCreatorAdmin.component.html',
  styleUrls: ['./itemCreatorAdmin.component.scss']
})
export class ItemCreatorAdminComponent implements OnInit {

  public itemCreatorObject: IItemCreate = {
    id: 0,
    itemName: '',
    minHeroLvl: 1,
    // itemstats
    itemId: 0,
    price: 0,
    additionalHp: 0,
    additionalDmg: 0,
    additionalLifeSteal: 0,
    additionalAp: 0,
    additionalManaRegen: 0,
    additionalPotionPower: 0,
    additionalHitPointsPerHit: 0,
    additionalGoldPerTenSec: 0,
    additionalBasicManaRegenPercentage: 0,
    additionalBasicHpRegenPercentage: 0,
    additionalArmour: 0,
    additionalMana: 0,
    additionalMagicResist: 0,
    additionalCooldownReduction: 0,
    additionalAttackSpeed: 0,
    additionalMovementSpeed: 0,
    additionalCriticalChance: 0,
    descriptions: '',
  };

  public itemCreator = this.fb.group({
    itemName: [
      '',
      [Validators.required, Validators.maxLength(20), Validators.minLength(3)],
    ],
    minHeroLvl: [
      1,
      [Validators.required, Validators.max(18), Validators.min(1)],
    ],
    price: [
      100,
      [Validators.required, Validators.max(3000), Validators.min(100)],
    ],
    additionalHp: [
      0,
      [Validators.required, Validators.max(3000), Validators.min(0)],
    ],
    additionalDmg: [
      0,
      [Validators.required, Validators.max(150), Validators.min(0)],
    ],
    additionalLifeSteal: [
      0,
      [Validators.required, Validators.max(10), Validators.min(0)],
    ],
    additionalAp: [
      0,
      [Validators.required, Validators.max(150), Validators.min(0)],
    ],
    additionalManaRegen: [
      0,
      [Validators.required, Validators.max(250), Validators.min(0)],
    ],
    additionalPotionPower: [
      0,
      [Validators.required, Validators.max(10), Validators.min(0)],
    ],
    additionalHitPointsPerHit: [
      0,
      [Validators.required, Validators.max(10), Validators.min(0)],
    ],
    additionalGoldPerTenSec: [
      0,
      [Validators.required, Validators.max(10), Validators.min(0)],
    ],
    additionalBasicManaRegenPercentage: [
      0,
      [Validators.required, Validators.max(10), Validators.min(0)],
    ],
    additionalBasicHpRegenPercentage: [
      0,
      [Validators.required, Validators.max(10), Validators.min(0)],
    ],
    additionalArmour: [
      0,
      [Validators.required, Validators.max(150), Validators.min(0)],
    ],
    additionalMana: [
      0,
      [Validators.required, Validators.max(500), Validators.min(0)],
    ],
    additionalMagicResist: [
      0,
      [Validators.required, Validators.max(100), Validators.min(0)],
    ],
    additionalCooldownReduction: [
      0,
      [Validators.required, Validators.max(10), Validators.min(0)],
    ],
    additionalAttackSpeed: [
      0,
      [Validators.required, Validators.max(1), Validators.min(0)],
    ],
    additionalMovementSpeed: [
      0,
      [Validators.required, Validators.max(100), Validators.min(0)],
    ],
    additionalCriticalChance: [
      0,
      [Validators.required, Validators.max(40), Validators.min(0)],
    ],
    descriptions: [
      '',
      [Validators.maxLength(5000)],
    ]
  });

  get itemName() {
    return this.itemCreator.get('itemName');
  }
  get minHeroLvl() {
    return this.itemCreator.get('minHeroLvl');
  }
  get price() {
    return this.itemCreator.get('price');
  }
  get additionalHp() {
    return this.itemCreator.get('additionalHp');
  }
  get additionalDmg() {
    return this.itemCreator.get('additionalDmg');
  }
  get additionalLifeSteal() {
    return this.itemCreator.get('additionalLifeSteal');
  }
  get additionalAp() {
    return this.itemCreator.get('additionalAp');
  }
  get additionalManaRegen() {
    return this.itemCreator.get('additionalManaRegen');
  }
  get additionalPotionPower() {
    return this.itemCreator.get('additionalPotionPower');
  }
  get additionalHitPointsPerHit() {
    return this.itemCreator.get('additionalHitPointsPerHit');
  }
  get additionalGoldPerTenSec() {
    return this.itemCreator.get('additionalGoldPerTenSec');
  }
  get additionalBasicManaRegenPercentage() {
    return this.itemCreator.get('additionalBasicManaRegenPercentage');
  }
  get additionalBasicHpRegenPercentage() {
    return this.itemCreator.get('additionalBasicHpRegenPercentage');
  }
  get additionalArmour() {
    return this.itemCreator.get('additionalArmour');
  }
  get additionalMana() {
    return this.itemCreator.get('additionalMana');
  }
  get additionalMagicResist() {
    return this.itemCreator.get('additionalMagicResist');
  }
  get additionalCooldownReduction() {
    return this.itemCreator.get('additionalCooldownReduction');
  }
  get additionalAttackSpeed() {
    return this.itemCreator.get('additionalAttackSpeed');
  }
  get additionalMovementSpeed() {
    return this.itemCreator.get('additionalMovementSpeed');
  }
  get additionalCriticalChance() {
    return this.itemCreator.get('additionalCriticalChance');
  }
  get descriptions() {
    return this.itemCreator.get('descriptions');
  }



  constructor(
    private itemService: ItemsService,
    private fb: FormBuilder,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {}

  saveItem() {
    // tutaj dać zapis ekwipunku
    let itemToCreate: IItemCreate = {
      id: 0,
      itemName: this.itemCreator.controls.itemName.value,
      minHeroLvl: +this.itemCreator.controls.minHeroLvl.value,

      itemId: 0,
      price: +this.itemCreator.controls.price.value,
      additionalHp: +this.itemCreator.controls.additionalHp.value,
      additionalDmg: +this.itemCreator.controls.additionalDmg.value,
      additionalLifeSteal: +this.itemCreator.controls.additionalLifeSteal.value,
      additionalAp: +this.itemCreator.controls.additionalAp.value,
      additionalManaRegen: +this.itemCreator.controls.additionalManaRegen.value,
      additionalPotionPower: +this.itemCreator.controls.additionalPotionPower.value,
      additionalHitPointsPerHit: +this.itemCreator.controls.additionalHitPointsPerHit.value,
      additionalGoldPerTenSec: +this.itemCreator.controls.additionalGoldPerTenSec.value,
      additionalBasicManaRegenPercentage: +this.itemCreator.controls.additionalBasicManaRegenPercentage.value,
      additionalBasicHpRegenPercentage: +this.itemCreator.controls.additionalBasicHpRegenPercentage.value,
      additionalArmour: +this.itemCreator.controls.additionalArmour.value,
      additionalMana: +this.itemCreator.controls.additionalMana.value,
      additionalMagicResist: +this.itemCreator.controls.additionalMagicResist.value,
      additionalCooldownReduction: +this.itemCreator.controls.additionalCooldownReduction.value,
      additionalAttackSpeed: +this.itemCreator.controls.additionalAttackSpeed.value,
      additionalMovementSpeed: +this.itemCreator.controls.additionalMovementSpeed.value,
      additionalCriticalChance: +this.itemCreator.controls.additionalCriticalChance.value,
      descriptions: this.itemCreator.controls.descriptions.value
    };

    this.itemService.addItem(itemToCreate).subscribe(
      () => {
        this.alertify.success('ukończono tworzenie przedmiotu');
        this.router.navigate(['/manageAdminItems']);
      },
      (errror) => {
        this.alertify.error(errror);
      }
    );
  }

  cancel() {
    this.router.navigate(['/manageAdminItems']);
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
