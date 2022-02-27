import { Injectable } from "@angular/core";

import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";

const NAMESPACE = `${environment.api}/namespace`;
const STAGES = `${environment.api}/stages`;
const ACTORS = `${environment.api}/actors`;
const USERS = `${environment.api}/users`;

@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor(private _httpClient: HttpClient) {}

  loadActors() {
    return this._httpClient.get(ACTORS).toPromise();
  }

  loadUsers() {
    return this._httpClient.get(USERS).toPromise();
  }

  loadNamespace() {
    return this._httpClient.get(NAMESPACE).toPromise();
  }
  loadStages() {
    return this._httpClient.get(STAGES).toPromise();
  }
}
