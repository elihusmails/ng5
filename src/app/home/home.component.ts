import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from "@angular/animations";
import { DataService } from "../data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('tasks', [
      transition('* => *', [
        query(':enter', style({ opacity: 0}), {optional: true}),
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity:0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity:.5, transform: 'translateY(35%)', offset: .3}),
            style({opacity:1, transform: 'translateY(0%)', offset: 1}),
          ]))]),{optional: true}),

        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity:1, transform: 'translateY(0%)', offset: 0}),
            style({opacity:.5, transform: 'translateY(35%)', offset: .3}),
            style({opacity:0, transform: 'translateY(-75%)', offset: 1}),
          ]))]),{optional: true})
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  taskCount : number;
  btnText: string = 'Add task';
  taskText: string = 'task';
  tasks = [''];

  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.goal.subscribe( res => this.tasks = res);
    this.taskCount = this.tasks.length;
    this._data.changeGoal(this.tasks);
  }

  addItem() {
    this.tasks.push(this.taskText);
    this.taskText = '';
    this.taskCount = this.tasks.length;
    this._data.changeGoal(this.tasks);
  }

  removeItem(i) {
    this.tasks.splice(i, 1);
    this._data.changeGoal(this.tasks);
    this.taskCount = this.tasks.length;
  }
}
