import { Injectable } from '@angular/core';
import { Player } from '../entities/player';
import { Team } from '../entities/team';
import { Game } from '../entities/game';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  public players: Map<string, Player>;
  public teams: Map<string, Team>;
  public games: Map<string, Game>;

  constructor() {
    this.players = new Map(JSON.parse(localStorage.getItem('players'))) || new Map();
    this.teams = new Map(JSON.parse(localStorage.getItem('teams'))) || new Map();
    this.games = new Map(JSON.parse(localStorage.getItem('games'))) || new Map();
  }

  //#region PLAYERS

  getPlayers(): Map<string, Player>{
    if(this.players) {
      return this.players;
    }
  }

  createPlayer(player: Player) {
    let randomNumber = Math.floor(Math.random()*(9000)+1000);
    let code = player.surname.toUpperCase().slice(0,3) + randomNumber;
    player.code = code;
    if(!this.players.has(code)) {
      this.players.set(code,player);
    }
    this.save();
  }

  updatePlayer(player: Player) {
    if(player.code) {      
      if(this.players.has(player.code)){        
        this.players.set(player.code, player);
      }
    }
    this.save();
  }

  deletePlayer(id) {
    this.players.delete(id);
    this.save();
  }

  //#endregion

  //#region TEAM

  getTeams(): Map<string, Team>{
    if(this.teams) {
      return this.teams;
    }
  }

  getTeam(code): Team {
    return this.teams.get(code) || null
  }

  createTeam(team: Team) {
    let randomNumber = Math.floor(Math.random()*(900)+100);
    let code = randomNumber + team.name.toUpperCase().slice(0,3);
    team.code = code;
    if(!this.teams.has(code)) {
      this.teams.set(code,team);
    }
    this.save();
  }

  deleteTeam(id) {
    this.teams.delete(id);
    this.save();
  }

  //#endregion

  //#region GAMES

  getGames(): Map<string, Game>{
    if(this.games) {
      return this.games;
    }
  }

  createGame(game: Game) {
    let code = game.home + 'v' + game.away + game.date
    game.code = code;
    if(!this.games.has(code)) {
      this.games.set(code,game);
    }
    this.save();
  }

  deleteGame(id) {
    this.games.delete(id);
    this.save();
  }

  //#endregion


  save() {
    localStorage.setItem('players', JSON.stringify(Array.from(this.players.entries())));
    localStorage.setItem('teams', JSON.stringify(Array.from(this.teams.entries())));
    localStorage.setItem('games', JSON.stringify(Array.from(this.games.entries())));
  }



}
