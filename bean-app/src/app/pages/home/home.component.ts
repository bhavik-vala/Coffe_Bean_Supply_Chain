import { Component, OnInit } from "@angular/core";
import { TransactionService } from "src/app/transaction.service";
import { StateService } from "src/app/state.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  beans: any = [];
  bean: any = {};
  showModal: Boolean = false;
  user: any = {};
  formToShow: string = "";
  formSelectionList = [
    "harvest",
    "certificate",
    "shipping",
    "warehouse",
    "roasting",
    "packaging",
    "wholesaler",
    "distributor",
    "retailer",
    "complete"
  ];

  constructor(
    private _transactionService: TransactionService,
    private _stateService: StateService,
    private _router: Router
  ) {}

  ngOnInit() {
    this._stateService.loadBeans().then(data => {
      this.beans = data;
    });
    const user = localStorage.getItem("user");
    if (user) {
      this.user = JSON.parse(user);
    }
    // this._transactionService.submit({ action: "TEST", data: "TEST" });
  }

  onHarvest() {
    this.showModal = true;
    this.formToShow = this.formSelectionList[0];
  }

  onRightClick(bean) {
    if (this.user && this.user.mail) {
      this.bean = bean;
      this.showModal = true;
      this.formToShow = this.formSelectionList[
        this.formSelectionList.indexOf(bean.stage) + 1
      ];
      return false;
    } else {
      return true;
    }
  }

  gotoBean(id) {
    this._router.navigate([`beans/${id}`]);
  }
  getStatus(bean, stage) {
    const FINAL = 8;
    /** Process Reached Final Stage */
    if (this.formSelectionList[FINAL] == bean.stage) {
      return "badge-success";
    }
    const nextStage = this.formSelectionList[
      this.formSelectionList.indexOf(bean.stage) + 1
    ];
    /** Current */
    if (stage == nextStage) {
      return "badge-warning";
    }
    /**
     * Completed Stage
     */
    if (bean[stage] || stage == bean.stage) {
      return "badge-success";
    }
    return "badge-dark";
  }
}
