import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/_services/items.service';

@Component({
  selector: 'app-itemCreatorAdmin',
  templateUrl: './itemCreatorAdmin.component.html',
  styleUrls: ['./itemCreatorAdmin.component.scss']
})
export class ItemCreatorAdminComponent implements OnInit {

  constructor(private itemService: ItemsService) { }

  ngOnInit() {
  }

}
