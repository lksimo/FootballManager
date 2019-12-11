import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from 'src/app/entities/player';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Team } from 'src/app/entities/team';

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

  backgroundColor(code) {
    if(this.chosenPlayers.indexOf(code) != -1) {
      return "yellowgreen"
    } else {
      return ""
    }
  }

  refresh() {
    this.players = [];
    if(this.team) {
      Array.from(this.apiService.getPlayers().values()).forEach(x => {
        if(x.team == this.team) {
          this.players.push(x);
        }
      })
    }
  }

  update(code) {
    console.log('Yes');
    
    if(this.chosenPlayers.indexOf(code) != -1) {
      this.chosenPlayers.splice(this.chosenPlayers.indexOf(code), 1);
    } else {
      this.chosenPlayers.push(code);
    }
    this.valueChange.emit(this.chosenPlayers);
  }

}
