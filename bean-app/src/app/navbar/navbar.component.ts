import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  user: any = {};
  authenticated: Boolean = false;
  constructor() {}

  ngOnInit() {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user) {
      this.user = JSON.parse(user);
    }
    if (token) {
      this.authenticated = token !== undefined;
    }
  }

  onLogout() {
    localStorage.clear();
    location.href = "";
  }
}
