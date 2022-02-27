import { Component, OnInit, Input } from "@angular/core";
import { TransactionService } from "../transaction.service";

@Component({
  selector: "app-receive-shipment-form",
  templateUrl: "./receive-shipment-form.component.html",
  styleUrls: ["./receive-shipment-form.component.scss"]
})
export class ReceiveShipmentFormComponent implements OnInit {
  @Input() bean: any = {};
  constructor(private _transactionService: TransactionService) {}

  ngOnInit() {}

  onSubmit(name, location, arrivalMode, storageCondition) {
    this._transactionService
      .receive(
        {
          name: name.value,
          location: location.value,
          arrivalMode: arrivalMode.value,
          storageCondition: storageCondition.value
        },
        this.bean
      )
      .subscribe(
        res => {
          location.href = "";
          window.location.reload();
        },
        err => {
          alert((err.error && err.error.message) || err.message);
          location.href = "";
          window.location.reload();
        }
      );
  }
}
