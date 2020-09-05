import { Component, OnInit } from '@angular/core';
import { Pagination } from '../models/pagination';
import { Observable } from 'rxjs/internal/Observable';
import { IHeroesManagementFilter } from '../models/Filters/IHeroesManagementFilter';
import { IHeroesManagement } from '../models/IHeroesManagement';
import { Validators, FormBuilder } from '@angular/forms';
import { HeroesService } from '../_services/heroes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroesManagementAdmin',
  templateUrl: './heroesManagementAdmin.component.html',
  styleUrls: ['./heroesManagementAdmin.component.css']
})
export class HeroesManagementAdminComponent implements OnInit {
  public userId: number = 0;
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

  heroesFilter: IHeroesManagementFilter = {
    heroNameLike: ''
  };

  hero: IHeroesManagement[];

  formFilter = this.fb.group(
    {
      heroNameLikeForm: [
        '',
        [Validators.maxLength(20)]
      ]
    });

  constructor(
    private fb: FormBuilder,
    private heroesService: HeroesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading$ = this.heroesService.loading$;

    this.reloadValues();
  }

  reloadValues() {
    this.setFilterFromForm();

    this.heroesService.loadHeroesToManagement(this.pagination, this.heroesFilter);
    this.heroesService.pagination$.subscribe(
      (value) => (this.pagination = value)
    );

    this.heroesService.heroesToManage$.subscribe((usrs) => (this.hero = usrs));
  }

  setFilterFromForm() {
    if (this.formFilter.controls.heroNameLikeForm) {
      this.heroesFilter.heroNameLike = this.formFilter.controls.heroNameLikeForm.value;
    }
  }


  resetFilter() {
    this.heroesFilter = {
      heroNameLike: ''
    };
    this.setFormFromFilter();
  }

  setFormFromFilter() {
    this.formFilter.setValue({
      heroNameLikeForm: this.heroesFilter.heroNameLike
    });
  }


  pageChanged(event: any) {
    this.pagination.currentPage = Number(event.page);
    this.heroesService.pagination$.subscribe(
      (value) => (this.pagination = value)
    );

    this.heroesService
      .getHeroesToManagement(
        this.pagination.currentPage,
        this.pagination.itemsPerPage
      )
      .subscribe((usrs) => {
        this.hero = usrs.result;
      });
  }

  addHero() {
    this.router.navigate(['/heroesCreatorAdmin']);
  }

  editHero(heroId: number) {
    this.heroesService.setSelectedHero(heroId);
    this.router.navigate(['/heroesEditorAdmin']);
  }
  // deleteHero(heroId: number) {

  // }
}
