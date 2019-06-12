import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { LoginComponent } from './core/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SidebarDirective } from './sidebar.directive';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    SidebarDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgProgressModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
   NgProgressHttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
