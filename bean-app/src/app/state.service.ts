import { Injectable } from "@angular/core";

import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { AppService } from "./app.service";

const BEAN = `${environment.api}/state/bean`;
const BEANS = `${environment.api}/state/beans`;
const STATE = `${environment.api}/state`;

const constants = {
  BEAN: "BEAN"
};

@Injectable({
  providedIn: "root"
})
export class StateService {
  bean: string = "";
  namespaces: object = {};
  constructor(
    private _httpClient: HttpClient,
    private _appService: AppService
  ) {}

  loadBeans() {
    return this._httpClient.get(`${BEANS}`).toPromise();
  }

  loadBean(beanId: string) {
    return this._httpClient.get(`${BEAN}/${beanId}`).toPromise();
  }
}
