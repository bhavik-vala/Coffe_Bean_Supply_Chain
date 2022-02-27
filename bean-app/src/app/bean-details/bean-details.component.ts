import { Component, OnInit } from "@angular/core";
import { StateService } from "../state.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-bean-details",
  templateUrl: "./bean-details.component.html",
  styleUrls: ["./bean-details.component.scss"]
})
export class BeanDetailsComponent implements OnInit {
  bean: any = {};
  address: string = "";
  constructor(
    private _stateService: StateService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(data => {
      this._stateService
        .loadBean(data["params"]["id"])
        .then((response: any) => {
          const { address, data } = response;
          this.bean = Object.assign(
            {
              address
            },
            data
          );
        });
    });
  }
}
