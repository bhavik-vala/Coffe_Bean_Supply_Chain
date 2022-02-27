import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/app.service";
import { TransactionService } from "src/app/transaction.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  actors: Array<string> = [];
  response: any = "";
  constructor(
    private _appService: AppService,
    private _transactionService: TransactionService
  ) {}

  ngOnInit() {
    this._appService.loadActors().then((actors: any) => (this.actors = actors));
  }

  onSubmit(name, mail, password, actor, location, address) {
    this._transactionService
      .register({
        name: name.value,
        mail: mail.value,
        password: password.value,
        actor: actor.value,
        location: location.value,
        address: address.value
      })
      .subscribe(
        res => {
          location.href = "login";
          alert("Account registered. Please login");
        },
        err => {
          this.response =
            err.error && typeof err.error.message === "string"
              ? err.error.message
              : err.message;
        }
      );
  }
}
