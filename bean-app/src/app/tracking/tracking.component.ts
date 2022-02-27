import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { TransactionService } from "../transaction.service";
import { AppService } from "../app.service";

@Component({
  selector: "app-tracking",
  templateUrl: "./tracking.component.html",
  styleUrls: ["./tracking.component.scss"]
})
export class TrackingComponent implements OnInit, OnChanges {
  @Input("beanData") beanData: any = {};
  _namespaces: object = {};
  _stages: Array<string> = [];

  constructor(private _appService: AppService) {}

  ngOnChanges() {}

  ngOnInit() {
    this._appService.loadNamespace().then(namespaces => {
      this._namespaces = namespaces;
    });
    this._appService.loadStages().then(stages => {
      this._stages = Object.values(stages);
    });
  }
  getStatus(stage) {
    return stage == this.beanData.stage
      ? "current"
      : this.beanData[stage]
      ? "completed"
      : "future";
  }
}
