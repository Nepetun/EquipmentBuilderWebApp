import { Component, OnInit } from '@angular/core';
import { IItems } from '../models/IItems';
import { FormBuilder, Validators } from '@angular/forms';
import { ItemsService } from '../_services/items.service';
import { HeroesService } from '../_services/heroes.service';
import { IHero } from '../models/IHero';
@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {
  public itemsArray: IItems[];
  public heroesArray: IHero[];

  public heroId: number;
  public firtItemId: number;
  public secondItemId: number;
  public thirdItemId: number;
  public fourthItemId: number;
  public fifthItemId: number;
  public sixthItemId: number;

  // equipmentGroup = this.fb.group(
  //   {
  //     userName: [
  //       '',
  //       [Validators.required,
  //       Validators.maxLength(20),
  //       Validators.minLength(5)]
  //     ]
  //   });

  constructor(private itemService: ItemsService, private heroesService: HeroesService, private fb: FormBuilder) { }


  ngOnInit() {
    this.loadHeroes();
    this.loadItems();
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

  saveEquipment(){
    // tutaj dać zapis ekwipunku
  }
}
