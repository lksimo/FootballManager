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
    if (!JSON.parse(localStorage.getItem('init'))) {
      this.players.set('DEF1111', { code: "DEF1111", surname: "Default1", injured: false, team: "111TEA" })
      this.players.set('DEF2222', { code: "DEF2222", surname: "Default2", injured: false, team: "111TEA" })
      this.players.set('DEF3333', { code: "DEF3333", surname: "Default3", injured: true, team: "111TEA" })
      this.players.set('DEF4444', { code: "DEF4444", surname: "Default4", injured: false, team: "111TEA" })
      this.players.set('DEF5555', { code: "DEF5555", surname: "Default5", injured: false, team: "222TEA" })
      this.players.set('DEF6666', { code: "DEF6666", surname: "Default6", injured: false, team: "222TEA" })
      this.players.set('DEF7777', { code: "DEF7777", surname: "Default7", injured: false, team: "222TEA" })
      this.players.set('DEF8888', { code: "DEF8888", surname: "Default8", injured: true, team: "222TEA" })
      this.teams.set('111TEA', { code: "111TEA", name: "Team1", venue: "Stadium1" })
      this.teams.set('222TEA', { code: "222TEA", name: "Team2", venue: "Stadium2" })
      this.games.set('111TEAv222TEA251219', { code: '111TEAv222TEA251219', home: '111TEA', homePlayers: ["DEF1111", "DEF2222", "DEF3333", "DEF4444"], away: '222TEA', awayPlayers: ["DEF5555", "DEF6666", "DEF7777", "DEF8888"], venue: 'Stadium1', date: "251219" })
      this.games.set('222TEAv111TEA251219', { code: '222TEAv111TEA261219', away: '111TEA', awayPlayers: ["DEF1111", "DEF2222", "DEF3333", "DEF4444"], home: '222TEA', homePlayers: ["DEF5555", "DEF6666", "DEF7777", "DEF8888"], venue: 'Stadium2', date: "261219" })
    }
  }

  //#region PLAYERS

  getPlayers(): Map<string, Player> {
    if (this.players) {
      return this.players;
    }
  }

  createPlayer(player: Player) {
    let randomNumber = Math.floor(Math.random() * (9000) + 1000);
    let code = player.surname.toUpperCase().slice(0, 3) + randomNumber;
    player.code = code;
    if (!this.players.has(code)) {
      this.players.set(code, player);
    }
    this.save();
  }

  updatePlayer(player: Player) {
    if (player.code) {
      if (this.players.has(player.code)) {
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

  getTeams(): Map<string, Team> {
    if (this.teams) {
      return this.teams;
    }
  }

  getTeam(code): Team {
    return this.teams.get(code) || null
  }

  createTeam(team: Team) {
    let randomNumber = Math.floor(Math.random() * (900) + 100);
    let code = randomNumber + team.name.toUpperCase().slice(0, 3);
    team.code = code;
    if (!this.teams.has(code)) {
      this.teams.set(code, team);
    }
    this.save();
  }

  deleteTeam(id) {
    this.teams.delete(id);
    this.save();
  }

  //#endregion

  //#region GAMES

  getGames(): Map<string, Game> {
    if (this.games) {
      return this.games;
    }
  }

  createGame(game: Game) {
    let code = game.home + 'v' + game.away + game.date
    game.code = code;
    if (!this.games.has(code)) {
      this.games.set(code, game);
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
    localStorage.setItem('init', JSON.stringify({ init: true }));
  }


}
