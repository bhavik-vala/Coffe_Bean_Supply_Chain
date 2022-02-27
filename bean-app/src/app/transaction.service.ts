import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";

const SUBMIT_TRANSACTION = `${environment.api}/submit`;
const LOGIN = `${environment.api}/auth/login`;
const REGISTER = `${environment.api}/auth/register/user`;
const APPROVE = mail => `${environment.api}/approve/user/${mail}`;
const RESET = `${environment.api}/reset/password`;

// Lifescycle
const HARVEST = `${environment.api}/api/bean/create`;
const CERTIFY = bean => `${environment.api}/api/bean/${bean.id}/certify`;
const SHIP = bean => `${environment.api}/api/bean/ship/${bean.id}`;
const RECEIVE = bean => `${environment.api}/api/bean/receive/${bean.id}`;
const ROAST = bean => `${environment.api}/api/bean/roast/${bean.id}`;
const PACKAGE = bean => `${environment.api}/api/bean/package/${bean.id}`;

const WHOLESALER = (bean, mail) =>
  `${environment.api}/api/bean/${bean.id}/wholesaler/${mail}`;
const DISTRIBUTOR = (bean, mail) =>
  `${environment.api}/api/bean/${bean.id}/distributor/${mail}`;
const RETAILER = (bean, mail) =>
  `${environment.api}/api/bean/${bean.id}/retailer/${mail}`;

@Injectable({
  providedIn: "root"
})
export class TransactionService {
  constructor(private _httpClient: HttpClient) {}

  submit(payload) {
    return this._httpClient.post(SUBMIT_TRANSACTION, payload).toPromise();
  }

  login(payload) {
    return this._httpClient.post(LOGIN, payload);
  }

  register(payload) {
    return this._httpClient.post(REGISTER, payload);
  }

  approve(mail) {
    return this._httpClient.post(APPROVE(mail), {});
  }

  reset(mail) {
    return this._httpClient.post(RESET, { mail });
  }

  // Life cycle
  harvest(payload) {
    return this._httpClient.post(HARVEST, payload);
  }
  certify(payload, bean) {
    return this._httpClient.post(CERTIFY(bean), payload);
  }

  ship(payload, bean) {
    return this._httpClient.post(SHIP(bean), payload);
  }

  receive(payload, bean) {
    return this._httpClient.post(RECEIVE(bean), payload);
  }

  roast(payload, bean) {
    return this._httpClient.post(ROAST(bean), payload);
  }

  package(payload, bean) {
    return this._httpClient.post(PACKAGE(bean), payload);
  }

  sellToWholesaler(bean, mail) {
    return this._httpClient.post(WHOLESALER(bean, mail), {});
  }
  sellToDistributor(bean, mail) {
    return this._httpClient.post(DISTRIBUTOR(bean, mail), {});
  }
  sellToRetailer(bean, mail) {
    return this._httpClient.post(RETAILER(bean, mail), {});
  }
}
