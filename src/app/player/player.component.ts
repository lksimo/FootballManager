import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../entities/player';
import { ApiServiceService } from '../services/api-service.service';
import Swal from 'sweetalert2';
import { Team } from '../entities/team';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  public players: Player[];
  public teams: Team[];
  public currentPlayer: Player = new Player;
  public editMode: boolean = false;

  constructor(private apiService: ApiServiceService) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.players = [];
    Array.from(this.apiService.getPlayers().values()).forEach(x => {
      this.players.push(x);
    })
    this.teams = [];
    Array.from(this.apiService.getTeams().values()).forEach(x => {
      this.teams.push(x);
    })
  }

  addPlayer() {
    if (this.currentPlayer.surname) {
      this.apiService.createPlayer(this.currentPlayer);
    }
    this.currentPlayer = new Player;
    this.refreshData();
  }

  updatePlayer(player: Player){
    this.apiService.updatePlayer(player);
  }

  isInjured(injured: boolean) {
    if(injured) {
      return "Injured"
    } else {
      return "Healthy"
    }
  }

  injuredColor(injured: boolean) {
    if(injured) {
      return "red"
    } else {
      return "yellowgreen"
    }
  }

  removePlayer(player: Player) {
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
      title: `Are you sure you want to delete ${player.surname}?`,
      text: "You cannot undo this",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.apiService.deletePlayer(player.code);
        this.refreshData();

        Toast.fire({
          icon: 'success',
          title: `Deleted player: ${player.surname}`
        })
      }
    })
  }

  canSubmit() {
    if (this.currentPlayer.surname) {
      if (this.currentPlayer.surname.length > 3) {
        return false;
      }
    }
    return true;
  }

}
