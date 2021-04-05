import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './core/shell/navbar/navbar.component';
import { FooterComponent } from './core/shell/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StepsService } from './core/services/steps.service';
import { PatientService } from './core/services/patient.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [StepsService, PatientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
