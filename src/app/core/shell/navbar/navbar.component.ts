import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { StepsService } from '../../services/steps.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  patient;
  titleClicks = 0;
  showImages = false;

  constructor(private patientService: PatientService, private stepService: StepsService) { }

  ngOnInit(): void {
    this.patientService.getPatient().subscribe(patient => this.patient = patient);
  }

  goHome(){
    this.stepService.setStep('home');
  }

  titleClick(){
    this.titleClicks = this.titleClicks + 1;
    this.showImages = this.titleClicks === 3;
  }

  goBack(){
    this.stepService.goBack$.next();

  }

}
