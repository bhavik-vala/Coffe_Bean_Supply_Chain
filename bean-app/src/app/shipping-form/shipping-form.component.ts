import { Component, OnInit, Input } from "@angular/core";
import { TransactionService } from "../transaction.service";

@Component({
  selector: "app-shipping-form",
  templateUrl: "./shipping-form.component.html",
  styleUrls: ["./shipping-form.component.scss"]
})
export class ShippingFormComponent implements OnInit {
  @Input() bean: any = {};
  constructor(private _transactionService: TransactionService) {}

  ngOnInit() {}

  onSubmit(
    dateOfDeparture,
    timeOfDeparture,
    estimatedDateOfArrival,
    estimatedTimeOfArrival,
    dispatchDetails
  ) {
    this._transactionService
      .ship(
        {
          timeOfDeparture: new Date(
            dateOfDeparture.valueAsNumber + timeOfDeparture.valueAsNumber
          ).toString(),
          estimatedTimeOfArrival: new Date(
            estimatedDateOfArrival.valueAsNumber +
              estimatedTimeOfArrival.valueAsNumber
          ).toString(),
          dispatchDetails: dispatchDetails.value
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
