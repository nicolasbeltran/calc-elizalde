import { Component, OnInit } from '@angular/core';
import { StepsService } from 'src/app/core/services/steps.service';
import jsonInfo from 'src/app/core/constants/data.json';
import { PatientService } from 'src/app/core/services/patient.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  patient: Patient = {};
  steps: any[];
  currentStep: any;
  jsonInfo = jsonInfo as any [];
  compData: any;

  constructor(private stepsService: StepsService, private patientService: PatientService) {
    this.steps = this.stepsService.mainSteps;
    this.currentStep = this.steps[0];
   }

  ngOnInit(): void {
    this.stepsService.getStep().subscribe(stepName => {
      this.currentStep = this.steps.find(step => step.name === stepName);
      this.patient = {};
      this.patientService.setPatient({})
    })
  }

  nextStep(stepName){
    this.currentStep = this.steps.find(step => step.name === stepName);
    if(this.currentStep.type === 'result'){
      console.log('result!');

      this.compData = this.jsonInfo.find(comp => comp.name === this.currentStep.name);
      console.log('this.compData', this.compData);
    }

  }

  addPatient(){
    this.patientService.setPatient(this.patient);

  }

}

interface Patient {
  name?: string;
  weight?: number;
}
