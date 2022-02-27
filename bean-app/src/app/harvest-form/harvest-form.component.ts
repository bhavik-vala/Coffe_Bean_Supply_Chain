import { Component, OnInit } from "@angular/core";
import { TransactionService } from "../transaction.service";

@Component({
  selector: "app-harvest-form",
  templateUrl: "./harvest-form.component.html",
  styleUrls: ["./harvest-form.component.scss"]
})
export class HarvestFormComponent implements OnInit {
  constructor(private _transactionService: TransactionService) {}

  ngOnInit() {}

  onSubmit(coffeeBeanType, temperature, humidity) {
    this._transactionService
      .harvest({ coffeeBeanType:coffeeBeanType.value, temperature:temperature.value, humidity:humidity.value })
      .subscribe(res => {
        location.href = "";
      });
  }
}
