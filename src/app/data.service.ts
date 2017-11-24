import { Injectable } from '@angular/core';
import { BehaviorSubject} from "rxjs/BehaviorSubject";


@Injectable()
export class DataService {

  private goals = new BehaviorSubject<any>(['The initial task']);
  goal = this.goals.asObservable();

  whatever = [];

  constructor() {
  }

  changeGoal(goal) {
    this.goals.next(goal);

    this.whatever.push( goal )

    console.log( this.whatever );
  }
}
