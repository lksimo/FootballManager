import { Component, OnInit } from '@angular/core';
import { Team } from '../entities/team';
import { ApiServiceService } from '../services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  
  public teams: Team[];
  public currentTeam: Team = new Team;
  public editMode: boolean = false;

  constructor(private apiService: ApiServiceService) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.teams = [];
    Array.from(this.apiService.getTeams().values()).forEach(x => {
      this.teams.push(x);
    })
  }

  addTeam() {
    if (this.currentTeam.name && this.currentTeam.venue) {
      this.apiService.createTeam(this.currentTeam);
    }
    this.currentTeam = new Team;
    this.refreshData();
  }

  removeTeam(team: Team) {
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
      title: `Are you sure you want to delete ${team.name}?`,
      text: "You cannot undo this",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.apiService.deleteTeam(team.code);
        this.refreshData();

        Toast.fire({
          icon: 'success',
          title: `Deleted Team: ${team.name}`
        })
      }
    })
  }

  getPlayersInTeam(team: Team) {
    let count = 0;
    Array.from(this.apiService.getPlayers().values()).forEach(x => {
      if(x.team == team.code) {
        count += 1;
      }
    })
    return count;
  }

  canSubmit() {
    if (this.currentTeam.name && this.currentTeam.venue) {
      if (this.currentTeam.name.length > 3) {
        return false;
      }
    }
    return true;
  }
}
