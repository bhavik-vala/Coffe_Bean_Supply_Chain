import { Component, OnInit, Input } from "@angular/core";
import { TransactionService } from "../transaction.service";

@Component({
  selector: "app-packaging-form",
  templateUrl: "./packaging-form.component.html",
  styleUrls: ["./packaging-form.component.scss"]
})
export class PackagingFormComponent implements OnInit {
  @Input() bean: any = {};
  constructor(private _transactionService: TransactionService) {}

  ngOnInit() {}

  onSubmit(typeOfSeed, coffeeBeanFamily, temperature, roastingQuality) {
    this._transactionService
      .package(
        {
          typeOfSeed: typeOfSeed.value,
          coffeeBeanFamily: coffeeBeanFamily.value,
          temperature: temperature.value,
          roastingQuality: roastingQuality.value
        },
        this.bean
      )
      .subscribe(
        res => {
          location.href = "";
        },
        err => {
          alert((err.error && err.error.message) || err.message);
          location.href = "";
        }
      );
  }
}
