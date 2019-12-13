import { Component, OnInit } from '@angular/core';
import { Game } from '../entities/game';
import { ApiServiceService } from '../services/api-service.service';
import Swal from 'sweetalert2';
import { Team } from '../entities/team';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public games: Game[];
  public teams: Team[];
  public currentGame: Game = new Game;
  public editMode: boolean = false;

  constructor(private apiService: ApiServiceService) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.games = [];
    Array.from(this.apiService.getGames().values()).forEach(x => {
      this.games.push(x);
    })
    this.teams = [];
    Array.from(this.apiService.getTeams().values()).forEach(x => {
      this.teams.push(x);
    })
  }

  addGame() {
    if (!this.canSubmit()) {
      console.log(this.currentGame.date);
      
      let year = this.currentGame.date.slice(0,4).slice(2,4);
      console.log(year);
      
      let month = this.currentGame.date.slice(5,7);
      let day = this.currentGame.date.slice(8,10);
      this.currentGame.date = day + month + year;
      
      this.currentGame.venue = this.apiService.getTeam(this.currentGame.home).venue;
      this.apiService.createGame(this.currentGame);
    }
    this.currentGame = new Game;
    this.refreshData();
  }

  setVenue() {
    this.currentGame.venue = this.apiService.getTeam(this.currentGame.home).venue;
  }

  removeGame(game: Game) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Swal.fire({
      title: `Are you sure you want to delete ${game.code}?`,
      text: "You cannot undo this",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.apiService.deleteGame(game.code);
        this.refreshData();

        Toast.fire({
          icon: 'success',
          title: `Deleted Game: ${game.code}`
        })
      }
    })
  }

  getPlayersInTeam() {
    return 'Test'
  }

  canSubmit() {
    if (this.currentGame.home && this.currentGame.away && this.currentGame.homePlayers && this.currentGame.awayPlayers && this.currentGame.date) {
       if(this.currentGame.homePlayers.length > 0 && this.currentGame.awayPlayers.length > 0) {
        return false;
       }
    }
    return true;
  }

  updateHomePlayers(event) {
    this.currentGame.homePlayers = event;
  }
  updateAwayPlayers(event) {
    this.currentGame.awayPlayers = event;
  }

  formatDate(date: string) {
    let dd = date.slice(0,2);
    let mm = date.slice(2,4);
    let yy = date.slice(4,6);
    return dd + "/" + mm + "/" + yy;
  }

}
