import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { PotentialEarningService } from '@core/services/potential-earning.service';
import { PotentialEarning } from '@shared/models/PotentialEarning.model';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  link = "overview";

  potentialEarning: PotentialEarning = new PotentialEarning();
  potentialEarningsList: Map<string, any>;
  potentialEarningPlaceList: Array<string> = new Array<string>();
  potentialEarningTypeList: Array<string> = new Array<string>();

  constructor(
    private potentialEarningService: PotentialEarningService
  ) { }

  ngOnInit() {
    this.potentialEarningService.getPotentialEarnings().subscribe(
      data => { 
        if(data.success && data.body.length > 0) {
          this.potentialEarningsList = new Map();

          const source = from(data.body);
          const filter = source.pipe(
            groupBy(item => (<PotentialEarning>item).place),
            // return each item in group as array
            mergeMap(group => group.pipe(toArray()))
          );
          
          filter.subscribe(
            val => {
              this.potentialEarningsList.set((<PotentialEarning>val[0]).place, val);
              this.potentialEarningPlaceList.push((<PotentialEarning>val[0]).place);
             }
          );          
          
          this.choosePlace(this.potentialEarningPlaceList[0]);
        }        
      }
    );
  }

  choosePlace(place) {
    let potentialEarnings = this.potentialEarningsList.get(place);

    this.potentialEarningTypeList = new Array<string>();
    for (let pe of potentialEarnings) {
      this.potentialEarningTypeList.push((<PotentialEarning>pe).type);
    }

    this.chooseType(place, this.potentialEarningTypeList[0]);
  }

  chooseType(place, type) {
    let potentialEarnings = this.potentialEarningsList.get(place);

    for (let pe of potentialEarnings) {
      if((<PotentialEarning>pe).type == type) {
        this.potentialEarning = pe;
        break;
      }
    }
  }
}
