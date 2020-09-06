import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Pagination } from '../models/pagination';
import { ItemsService } from '../_services/items.service';
import { Router } from '@angular/router';
import { IItemsManagementFilter } from '../models/Filters/IItemsManagementFilter';
import { IItemManagement } from '../models/IItemManagement';
import { FormBuilder, Validators } from '@angular/forms';
import { GamesService } from '../_services/games.service';
import { IGames } from '../models/IGames';

@Component({
  selector: 'app-itemManagementAdmin',
  templateUrl: './itemManagementAdmin.component.html',
  styleUrls: ['./itemManagementAdmin.component.scss']
})
export class ItemManagementAdminComponent implements OnInit {

  selectedCardIndex = -1;
  itemsPerPage = 2;
  loading$: Observable<boolean>;
  rotate = true;
  public pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 3,
    totalPages: 2,
  };

  itemsFilter: IItemsManagementFilter = {
    itemNameLike: '',
    gameId: 0
  };

  items: IItemManagement[];
  public gamesArray: IGames[];
  formFilter = this.fb.group(
    {
      itemNameLikeForm: [
        '',
        [Validators.maxLength(20)]
      ],
      gameId: [
        0
      ],
    });

    public selectedItemId: number = 0;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemsService,
    private gameService: GamesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading$ = this.itemService.loading$;
    this.gameService.getGamesToLookUp().subscribe((games) => {
      this.gamesArray = games;
      this.gamesArray.push({id: 0, gameName: 'Wszystkie'});
    });

    this.reloadValues();
  }

  // gameChange(gameId: number) {
  //   console.log(gameId);
  //   this.itemCreatorObject.gameId = gameId;
  // }
  reloadValues() {
    this.setFilterFromForm();

    this.itemService.loadItemsToManagement(this.pagination, this.itemsFilter);
    this.itemService.pagination$.subscribe(
      (value) => (this.pagination = value)
    );

    this.itemService.itemsToManage$.subscribe((usrs) => (this.items = usrs));
  }

  setFilterFromForm() {
    if (this.formFilter.controls.itemNameLikeForm) {
      this.itemsFilter.itemNameLike = this.formFilter.controls.itemNameLikeForm.value;
    }
    this.itemsFilter.gameId = this.formFilter.controls.gameId.value;
  }


  resetFilter() {
    this.itemsFilter = {
      itemNameLike: '',
      gameId: 0
    };
    this.setFormFromFilter();
  }

  setFormFromFilter() {
    this.formFilter.setValue({
      itemNameLikeForm: this.itemsFilter.itemNameLike,
      gameId: this.itemsFilter.gameId
    });
  }

  returnToGroups() {
    this.router.navigate(["/myGroups"]);
  }

  pageChanged(event: any) {
    this.pagination.currentPage = Number(event.page);
    this.itemService.pagination$.subscribe(
      (value) => (this.pagination = value)
    );

    this.itemService
      .getItemsToManagement(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.itemsFilter
      )
      .subscribe((usrs) => {
        this.items = usrs.result;
      });
  }

  addItem() {
    this.router.navigate(['/itemCreator']);
  }

  editItem(itemId: number) {
    this.selectedItemId = itemId;
    this.itemService.setSelectedItemId(itemId);
    this.router.navigate(['/itemEditor']);
  }
}
