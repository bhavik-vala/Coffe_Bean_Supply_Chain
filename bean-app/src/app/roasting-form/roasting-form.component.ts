import { Component, OnInit, Input } from "@angular/core";
import { TransactionService } from "../transaction.service";

@Component({
  selector: "app-roasting-form",
  templateUrl: "./roasting-form.component.html",
  styleUrls: ["./roasting-form.component.scss"]
})
export class RoastingFormComponent implements OnInit {
  @Input() bean: any = {};
  constructor(private _transactionService: TransactionService) {}

  ngOnInit() {}

  onSubmit(registrationNumber) {
    this._transactionService.roast({ registrationNumber:registrationNumber.value }, this.bean).subscribe(
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
