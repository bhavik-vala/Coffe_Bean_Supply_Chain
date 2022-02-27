import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TrackingComponent } from "./tracking/tracking.component";
import { HomeComponent } from "./pages/home/home.component";
import { RegisterComponent } from "./pages/register/register.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BeanDetailsComponent } from "./bean-details/bean-details.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { TableComponent } from "./table/table.component";
import { HarvestFormComponent } from "./harvest-form/harvest-form.component";
import { CertifyFormComponent } from "./certify-form/certify-form.component";
import { ShippingFormComponent } from "./shipping-form/shipping-form.component";
import { ReceiveShipmentFormComponent } from "./receive-shipment-form/receive-shipment-form.component";
import { RoastingFormComponent } from "./roasting-form/roasting-form.component";
import { PackagingFormComponent } from "./packaging-form/packaging-form.component";
import { SellWholesalerFormComponent } from "./sell-wholesaler-form/sell-wholesaler-form.component";
import { SellDistributorFormComponent } from "./sell-distributor-form/sell-distributor-form.component";
import { SellRetailerFormComponent } from "./sell-retailer-form/sell-retailer-form.component";
import { LoginComponent } from "./login/login.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { TokenInterceptor } from "./token.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    TrackingComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    BeanDetailsComponent,
    NavbarComponent,
    TableComponent,
    HarvestFormComponent,
    CertifyFormComponent,
    ShippingFormComponent,
    ReceiveShipmentFormComponent,
    RoastingFormComponent,
    PackagingFormComponent,
    SellWholesalerFormComponent,
    SellDistributorFormComponent,
    SellRetailerFormComponent,
    AdminDashboardComponent,
    LoginPageComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
