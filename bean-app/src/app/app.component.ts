import { Component, OnInit } from "@angular/core";
import { AppService } from "./app.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(private _appService: AppService) {}

  ngOnInit() {
    // this._appService.loadNamespace().then(() => {
    //   console.log(this._appService.getNamespace());
    // });
  }
}
