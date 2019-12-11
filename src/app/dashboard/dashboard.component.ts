import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { Player } from '../entities/player';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    
  }

}
