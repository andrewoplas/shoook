import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { PotentialEarningService } from '@core/services/potential-earning.service';
import { PotentialEarning } from '@shared/models/PotentialEarning.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  link = "overview";
  potentialEarningsList: Array<PotentialEarning>;

  constructor(
    private potentialEarningService: PotentialEarningService
  ) { }

  ngOnInit() {
    this.potentialEarningService.getPotentialEarnings().subscribe(
      data => { this.potentialEarningsList = data; console.log(data); }
    );
  }

}
