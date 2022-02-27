import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";
import { TransactionService } from "../transaction.service";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"]
})
export class AdminDashboardComponent implements OnInit {
  users: Array<any> = [];
  allUsers: Array<any> = [];
  constructor(
    private _appService: AppService,
    private _transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this._appService.loadUsers().then((users: Array<any>) => {
      this.users = users.filter(obj => !obj["approved"]);
      this.allUsers = users.filter(obj => obj["approved"]);
    });
  }

  onApprove(mail) {
    this._transactionService.approve(mail).subscribe(res => {
      this.loadUsers();
    });
  }

  onResetPassword(mail) {
    this._transactionService.reset(mail).subscribe((res: any) => {
      alert(res && res.message);
      this.loadUsers();
    });
  }
}
