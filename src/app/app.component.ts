import { Component, OnInit } from '@angular/core';
import { Operator } from './models/operator.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  operatorA: Array<Operator> = [];
  operatorB: Array<Operator> = [];
  aList: any[];
  bList: any[];
  newCost: number;
  newPrefix: number;
  operatorType: string;
  errorText : string;
  constructor() {
    this.aList = [{ "numberPrefix": 1, "cost": 0.9 }, { "numberPrefix": 268, "cost": 5.1 }, { "numberPrefix": 46, "cost": 0.17 }, { "numberPrefix": 4620, "cost": 0 }, { "numberPrefix": 468, "cost": 0.15 }, { "numberPrefix": 4631, "cost": 0.15 }, { "numberPrefix": 4673, "cost": 0.9 }, { "numberPrefix": 46732, "cost": 1.1 }];
    this.bList = [{ "numberPrefix": 1, "cost": 0.92 }, { "numberPrefix": 44, "cost": 0.5 }, { "numberPrefix": 46, "cost": 0.2 }, { "numberPrefix": 467, "cost": 1 }, { "numberPrefix": 48, "cost": 1.2 }];
    this.operatorA = [];
    this.operatorB = [];
  }
  ngOnInit() {
    this.aList.forEach(function (item, index, array) {
      var obj = new Operator();
      obj.id = (index + 1).toString();
      obj.cost = item.cost;
      obj.numberPrefix = item.numberPrefix;
      this.operatorA.push(obj);
    }.bind(this));

    this.bList.forEach(function (item, index, array) {
      var obj = new Operator();
      obj.id = (index + 1).toString();
      obj.cost = item.cost;
      obj.numberPrefix = item.numberPrefix;
      this.operatorB.push(obj);
    }.bind(this));
  }


  saveNewCost() {
    if (!this.operatorType || !this.newCost || !this.newPrefix)
     { 
       this.errorText = "all fields are manadatory";
       return;
     }
     this.errorText = "";
    var obj = new Operator();
    obj.id = (this.operatorB.length + 1).toString();
    obj.cost = this.newCost;
    obj.numberPrefix = this.newPrefix;
    if (this.operatorType == "b")
      this.operatorB.push(obj);
    else
      this.operatorA.push(obj);

    this.operatorType = this.newCost = this.newPrefix = null;
  }
}
