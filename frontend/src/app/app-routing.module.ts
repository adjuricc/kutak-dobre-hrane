import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { GuestPageComponent } from './guest-page/guest-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { AdminLoginPageComponent } from './admin-login-page/admin-login-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { WaiterPageComponent } from './waiter-page/waiter-page.component';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { ResetPasswordSecurityQuestionPageComponent } from './reset-password-security-question-page/reset-password-security-question-page.component';
import { NewPasswordFromPageComponent } from './new-password-from-page/new-password-from-page.component';
import { GuestProfilePageComponent } from './guest-profile-page/guest-profile-page.component';
import { GuestEditProfilePageComponent } from './guest-edit-profile-page/guest-edit-profile-page.component';
import { GuestRestaurantsComponent } from './guest-restaurants/guest-restaurants.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { GuestReservationsComponent } from './guest-reservations/guest-reservations.component';
import { CartComponent } from './cart/cart.component';
import { FoodDeliveryComponent } from './food-delivery/food-delivery.component';
import { AdminGuestRequestsComponent } from './admin-guest-requests/admin-guest-requests.component';
import { AdminAddWaiterComponent } from './admin-add-waiter/admin-add-waiter.component';
import { AdminAddRestaurantComponent } from './admin-add-restaurant/admin-add-restaurant.component';
import { WaiterProfilePageComponent } from './waiter-profile-page/waiter-profile-page.component';
import { WaiterReservationsComponent } from './waiter-reservations/waiter-reservations.component';
import { WaiterStatisticsComponent } from './waiter-statistics/waiter-statistics.component';
import { WaiterDeliveriesComponent } from './waiter-deliveries/waiter-deliveries.component';
import { WaiterEditPageComponent } from './waiter-edit-page/waiter-edit-page.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { HistogramComponent } from './histogram/histogram.component';

const routes: Routes = [
  {path: "", component: GuestPageComponent},
  {path: "guest/:username", component: GuestProfilePageComponent},
  {path: "waiter/:username", component: WaiterProfilePageComponent},
  {path: "admin/:username", component: AdminPageComponent},
  {path: "registration", component: RegistrationPageComponent},
  {path: "admin_login", component: AdminLoginPageComponent},
  {path: "reset_password", component: ResetPasswordPageComponent},
  {path: "security_question", component: ResetPasswordSecurityQuestionPageComponent},
  {path: "new_password_form", component: NewPasswordFromPageComponent},
  {path: "guest_edit/:username", component: GuestEditProfilePageComponent},
  {path: "login", component: LoginPageComponent},
  {path: "restaurants", component: GuestRestaurantsComponent},
  {path: "restaurant/:name", component: RestaurantComponent},
  {path: "guest_reservations", component: GuestReservationsComponent},
  {path: "cart", component: CartComponent},
  {path: "guest_food_delivery", component: FoodDeliveryComponent},
  {path: "guest_requests", component: AdminGuestRequestsComponent},
  {path: "add_waiter", component: AdminAddWaiterComponent},
  {path: "add_restaurant", component: AdminAddRestaurantComponent},
  {path: "waiter_reservations", component: WaiterReservationsComponent},
  {path: "waiter_statistics", component: WaiterStatisticsComponent},
  {path: "waiter_deliveries", component: WaiterDeliveriesComponent},
  {path: "waiter_edit_page/:username", component: WaiterEditPageComponent},
  {path: "waiter_bar_chart", component: BarChartComponent},
  {path: "waiter_pie_chart", component: PieChartComponent},
  {path: "waiter_histogram", component: HistogramComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
