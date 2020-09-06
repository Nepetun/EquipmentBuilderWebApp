import { Component, OnInit } from '@angular/core';
import { IGames } from '../models/IGames';
import { Pagination } from '../models/pagination';
import { AuthService } from '../_services/auth.service';
import { GamesService } from '../_services/games.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  games: IGames[];
  selectedGame = false;
  itemsPerPage = 2;
  rotate = true;
  public pagination: Pagination = { currentPage: 1, itemsPerPage: 3, totalItems: 3, totalPages: 2};

  constructor(
    private authService: AuthService,
    private gameService: GamesService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.reloadValues();
  }

  reloadValues() {
    this.gameService.loadGames(this.pagination);
    this.gameService.pagination$.subscribe((value) => (this.pagination = value));
    this.gameService.games$.subscribe((grp) => (this.games = grp));
  }

  createGame() {
    this.router.navigate(['/adminGamesCreator']);
  }

  setFocusedGroupId(id: number) {
    this.gameService.setSelectedGameId(id);
  }

  pageChanged(event: any) {
    this.pagination.currentPage = Number(event.page);
    this.gameService.pagination$.subscribe((value) => (this.pagination = value));

    this.gameService.getGames( this.pagination.currentPage, this.pagination.itemsPerPage).subscribe((grp) => {
      this.games = grp.result;
    });
  }

}
