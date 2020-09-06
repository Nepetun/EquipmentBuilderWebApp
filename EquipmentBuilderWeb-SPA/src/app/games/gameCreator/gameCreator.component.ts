import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { GamesService } from 'src/app/_services/games.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { IGames } from 'src/app/models/IGames';

@Component({
  selector: 'app-gameCreator',
  templateUrl: './gameCreator.component.html',
  styleUrls: ['./gameCreator.component.scss']
})
export class GameCreatorComponent implements OnInit {
  public userId: number;
  gameInformation = this.fb.group(
    {
      gameName: [
        '', [Validators.required, Validators.maxLength(40),
          Validators.minLength(5)]
      ]
    });

    get gameName() {
      return this.gameInformation.get('gameName');
    }

  constructor(
    private gameService: GamesService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  saveGame() {
    // tutaj dać zapis ekwipunku
    let gameToCreate: IGames = {
      gameName: this.gameInformation.controls.gameName.value,
      id: 0
    };

    this.gameService.addGame(gameToCreate).subscribe(
      () => {
        this.alertify.success('ukończono tworzenie gry');
        this.router.navigate(['/manageAdminGames']);
      },
      errror => {
        this.alertify.error(errror);
      }
    );

  }

  cancel() {
    this.router.navigate(['/manageAdminGames']);
  }
}
