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

  constructor(private patientService: PatientService, private stepService: StepsService) { }

  ngOnInit(): void {
    this.patientService.getPatient().subscribe(patient => this.patient = patient)
  }

  goHome(){
    this.stepService.setStep('home');
  }

}
