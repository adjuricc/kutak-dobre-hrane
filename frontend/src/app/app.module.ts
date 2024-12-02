import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { StudentPageComponent } from './student-page/student-page.component';
import { GuestPageComponent } from './guest-page/guest-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminLoginPageComponent } from './admin-login-page/admin-login-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { WaiterPageComponent } from './waiter-page/waiter-page.component';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { ResetPasswordSecurityQuestionPageComponent } from './reset-password-security-question-page/reset-password-security-question-page.component';
import { NewPasswordFromPageComponent } from './new-password-from-page/new-password-from-page.component';
import { GuestProfilePageComponent } from './guest-profile-page/guest-profile-page.component';
import { GuestEditProfilePageComponent } from './guest-edit-profile-page/guest-edit-profile-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GuestRestaurantsComponent } from './guest-restaurants/guest-restaurants.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ChartModule } from 'primeng/chart';



import { GuestReservationsComponent } from './guest-reservations/guest-reservations.component';
import { CartComponent } from './cart/cart.component';
import { FoodDeliveryComponent } from './food-delivery/food-delivery.component';
import { WaiterNavbarComponent } from './waiter-navbar/waiter-navbar.component';
import { WaiterProfilePageComponent } from './waiter-profile-page/waiter-profile-page.component';
import { WaiterReservationsComponent } from './waiter-reservations/waiter-reservations.component';
import { WaiterDeliveriesComponent } from './waiter-deliveries/waiter-deliveries.component';
import { WaiterStatisticsComponent } from './waiter-statistics/waiter-statistics.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminGuestRequestsComponent } from './admin-guest-requests/admin-guest-requests.component';
import { AdminAddWaiterComponent } from './admin-add-waiter/admin-add-waiter.component';
import { AdminAddRestaurantComponent } from './admin-add-restaurant/admin-add-restaurant.component';
import { WaiterEditPageComponent } from './waiter-edit-page/waiter-edit-page.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { HistogramComponent } from './histogram/histogram.component';
import { UserNavbarComponent } from './user-navbar/user-navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    StudentPageComponent,
    GuestPageComponent,
    RegistrationPageComponent,
    AdminLoginPageComponent,
    AdminPageComponent,
    WaiterPageComponent,
    ResetPasswordPageComponent,
    ResetPasswordSecurityQuestionPageComponent,
    NewPasswordFromPageComponent,
    GuestProfilePageComponent,
    GuestEditProfilePageComponent,
    NavbarComponent,
    GuestRestaurantsComponent,
    RestaurantComponent,
    GuestReservationsComponent,
    CartComponent,
    FoodDeliveryComponent,
    WaiterNavbarComponent,
    WaiterProfilePageComponent,
    WaiterReservationsComponent,
    WaiterDeliveriesComponent,
    WaiterStatisticsComponent,
    AdminNavbarComponent,
    AdminGuestRequestsComponent,
    AdminAddWaiterComponent,
    AdminAddRestaurantComponent,
    WaiterEditPageComponent,
    BarChartComponent,
    PieChartComponent,
    HistogramComponent,
    UserNavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
    MatDatepickerModule,
    MatInputModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    CalendarModule,
    TableModule,
    RatingModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    RadioButtonModule,
    PasswordModule,
    DropdownModule,
    FileUploadModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
