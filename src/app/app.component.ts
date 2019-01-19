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
  aDefaultList: any[];
  bDefaultList: any[];
  newCost: number;
  newPrefix: number;
  operatorType: string;
  cheapestOperator: string;
  phoneNumber: number;
  errorTextPhoneNumber: string;
  errorTextAddCost: string;
  
  constructor() {
    this.aDefaultList = [{ "numberPrefix": 1, "cost": 0.9 }, { "numberPrefix": 268, "cost": 5.1 }, { "numberPrefix": 46, "cost": 0.17 }, { "numberPrefix": 4620, "cost": 0 }, { "numberPrefix": 468, "cost": 0.15 }, { "numberPrefix": 4631, "cost": 0.15 }, { "numberPrefix": 4673, "cost": 0.9 }, { "numberPrefix": 46732, "cost": 1.1 }];
    this.bDefaultList = [{ "numberPrefix": 1, "cost": 0.92 }, { "numberPrefix": 44, "cost": 0.5 }, { "numberPrefix": 46, "cost": 0.2 }, { "numberPrefix": 467, "cost": 1 }, { "numberPrefix": 48, "cost": 1.2 }];
    this.operatorA = [];
    this.operatorB = [];
  }
  ngOnInit() {
    this.aDefaultList.forEach(function (item, index, array) {
      var obj = new Operator();
      obj.id = (index + 1).toString();
      obj.cost = item.cost;
      obj.type = "Operator A";
      obj.numberPrefix = item.numberPrefix;
      this.operatorA.push(obj);
    }.bind(this));

    this.bDefaultList.forEach(function (item, index, array) {
      var obj = new Operator();
      obj.id = (index + 1).toString();
      obj.cost = item.cost;
      obj.type = "Operator B";
      obj.numberPrefix = item.numberPrefix;
      this.operatorB.push(obj);
    }.bind(this));
  }

  checkCheapestOperator() {

    this.cheapestOperator = "";

    if (!this.phoneNumber) {
      this.errorTextPhoneNumber = "enter a vaid phone number!";
      return
    };

    if (this.phoneNumber.toString().length < 5) {
      this.errorTextPhoneNumber = "minimum length should be 5";
      return;
    }

    this.errorTextPhoneNumber = "";
    var listA = this.operatorB.filter(function (i) {
      if (this.phoneNumber.toString().startsWith(i.numberPrefix.toString())) return i.numberPrefix;
    }.bind(this));

    var listB = this.operatorA.filter(function (i) {
      if (this.phoneNumber.toString().startsWith(i.numberPrefix.toString())) return i;
    }.bind(this));

    var listC = [];

    if (listA.length > 0)
      listC = listC.concat(listA);

    if (listB.length > 0)
      listC = listC.concat(listB);

    if (listC.length <= 0)
      this.errorTextPhoneNumber = "operator not available";
    else if (listC.length == 1)
      this.cheapestOperator = listC[0].type + " is the cheapest operator with call rate : " + listC[0].cost + "₹/min";
    else {
      var maxMatch = Math.max.apply(Math, listC.map(function (o) { return o.numberPrefix; }));
      var maxMatchList = listC.filter(function (i) { if (i.numberPrefix == maxMatch) return i; });
      var minCost = Math.min.apply(Math, maxMatchList.map(function (o) { return o.cost; }));
      var minCostItem = listC.filter(function (i) { if (i.cost == minCost) return i; });
      this.cheapestOperator = minCostItem[0].type + " is the cheapest operator with call rate : " + minCostItem[0].cost + "₹/min";
    }
  }

  saveNewCost() {
    if (!this.newPrefix && this.newPrefix != 0) {
      this.errorTextAddCost = "enter a valid prefix!";
      return;
    }
    if (!this.newCost && this.newCost != 0) {
      this.errorTextAddCost = "enter a valid cost!";
      return;
    }
    if (!this.operatorType) {
      this.errorTextAddCost = "choose operator!";
      return;
    }

    this.errorTextAddCost = "";

    var obj = new Operator();
    obj.id = (this.operatorB.length + 1).toString();
    obj.cost = this.newCost;
    obj.numberPrefix = this.newPrefix;

    if (this.operatorType == "b") {
      obj.type = "Operator B";
      this.operatorB.push(obj);
    } else {
      obj.type = "Operator A";
      this.operatorA.push(obj);
    }
    this.cheapestOperator = this.operatorType = this.newCost = this.newPrefix = null;
    this.checkCheapestOperator();
  }
}
