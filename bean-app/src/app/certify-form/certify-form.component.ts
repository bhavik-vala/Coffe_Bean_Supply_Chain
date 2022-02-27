import { Component, OnInit, Input } from "@angular/core";
import { TransactionService } from "../transaction.service";

@Component({
  selector: "app-certify-form",
  templateUrl: "./certify-form.component.html",
  styleUrls: ["./certify-form.component.scss"]
})
export class CertifyFormComponent implements OnInit {
  @Input() bean: any = {};
  constructor(private _transactionService: TransactionService) {}

  ngOnInit() {}

  onSubmit(typeOfSeed, coffeeBeanFamily, fertilizerUsed, farmAddress) {
    this._transactionService
      .certify(
        {
          typeOfSeed: typeOfSeed.value,
          coffeeBeanFamily: coffeeBeanFamily.value,
          fertilizerUsed: fertilizerUsed.value,
          farmAddress: farmAddress.value
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
