import { Component, OnInit } from "@angular/core";
import { TransactionService } from "../transaction.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(private _transactionService: TransactionService) {}

  ngOnInit() {}

  onSubmit(mail, password) {
    const payload = {
      mail: mail.value,
      password: password.value
    };
    this._transactionService.login(payload).subscribe((res: any) => {
      const { token, user } = res;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      location.href = "";
    });
  }
}
