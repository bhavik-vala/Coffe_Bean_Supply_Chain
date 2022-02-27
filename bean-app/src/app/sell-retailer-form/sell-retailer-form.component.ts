import { Component, OnInit, Input } from "@angular/core";
import { TransactionService } from "../transaction.service";
import { AppService } from '../app.service';

@Component({
  selector: "app-sell-retailer-form",
  templateUrl: "./sell-retailer-form.component.html",
  styleUrls: ["./sell-retailer-form.component.scss"]
})
export class SellRetailerFormComponent implements OnInit {
  @Input() bean: any = {};
  users: Array<any> = [];
  constructor(
    private _transactionService: TransactionService,
    private _appService: AppService
  ) {}

  ngOnInit() {
    this._appService.loadUsers().then((users: Array<any>) => {
      this.users = users.filter(obj => obj.actor === "RETAILER");
    });
  }

  onSubmit(email) {
    this._transactionService.sellToRetailer(this.bean, email.value).subscribe(
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
