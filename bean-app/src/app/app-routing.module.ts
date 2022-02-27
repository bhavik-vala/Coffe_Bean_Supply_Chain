import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { BeanDetailsComponent } from "./bean-details/bean-details.component";
import { RegisterComponent } from "./pages/register/register.component";
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  { path: "", pathMatch: "full", component: HomeComponent },
  { path: "beans/:id", pathMatch: "full", component: BeanDetailsComponent },
  { path: "login", pathMatch: "full", component: LoginPageComponent },
  { path: "register", pathMatch: "full", component: RegisterComponent },
  { path: "admin", pathMatch: "full", component: AdminDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
