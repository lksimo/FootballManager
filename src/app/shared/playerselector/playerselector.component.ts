import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from 'src/app/entities/player';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Team } from 'src/app/entities/team';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-playerselector',
  templateUrl: './playerselector.component.html',
  styleUrls: ['./playerselector.component.scss']
})
export class PlayerselectorComponent implements OnInit {

  public team;

  @Input() set chosenTeam(v: string) {
    this.team = v;
    this.refresh();
  }

  @Input() title: string;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  public players: Player[];
  public chosenPlayers: string[] = [];

  constructor(private apiService: ApiServiceService) { }

  ngOnInit() {
    this.refresh();
  }

  playerChoiceClass(player: Player) {
    if(player.injured) {
      return "inactive dropdown-item"
    }
    if(this.chosenPlayers.indexOf(player.code) != -1) {
      return "active dropdown-item"
    } else {
      return "dropdown-item"
    }
  }

  refresh() {
    this.players = [];
    this.chosenPlayers = [];
    if(this.team) {
      Array.from(this.apiService.getPlayers().values()).forEach(x => {
        if(x.team == this.team) {
          this.players.push(x);
        }
      })
    }
  }

  update(player: Player) {
    if(player.injured) {
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
      Toast.fire({
        icon: 'error',
        title: `Player is injured!`
      })
      return;
    }
    
    if(this.chosenPlayers.indexOf(player.code) != -1) {
      this.chosenPlayers.splice(this.chosenPlayers.indexOf(player.code), 1);
    } else {
      this.chosenPlayers.push(player.code);
    }
    this.valueChange.emit(this.chosenPlayers);
  }

}
