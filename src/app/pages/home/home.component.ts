import { Component, OnInit } from '@angular/core';
import { StepsService } from 'src/app/core/services/steps.service';
import jsonInfo from 'src/app/core/constants/data.json';
import { PatientService } from 'src/app/core/services/patient.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  name: string;
  weight: number;
  altWeight: number;

  steps: any[];
  currentStep: any;
  jsonInfo = jsonInfo as any [];
  compData: any;

  hipokalemiaMgSRel: string;
  hipokalemiaMgSVia: string;

  constructor(private stepsService: StepsService, private patientService: PatientService) {
    this.steps = this.stepsService.mainSteps;
    this.currentStep = this.steps[0];
   }

  ngOnInit(): void {
    this.stepsService.getStep().subscribe(stepName => {
      this.currentStep = this.steps.find(step => step.name === stepName);
      if(stepName === 'home'){
        this.name = ''; this.weight = undefined;
        this.patientService.setPatient({})
      }
    })
    this.stepsService.goBack$.subscribe(() => {
      this.currentStep = this.steps.find(step => step.name === this.currentStep.prevStep);
      if(this.currentStep.name === 'home'){
        this.name = ''; this.weight = undefined;
        this.patientService.setPatient({})
      }
    })
  }

  nextStep(option){
    const nextStep = this.steps.find(step => step.name === option.key);
    if(!nextStep){
      this.currentStep = { name: option.key, label: option.label, type: 'result', prevStep: this.currentStep.name}
      this.compData = this.jsonInfo.find(comp => comp.name === this.currentStep.name);
      this.handleResults();
    } else {
      this.currentStep = nextStep;
    }

  }

  addPatient(){
    this.patientService.setPatient({ name: this.name, weight: this.weight});
  }

  /////////////

  handleResults(){
    switch (this.currentStep.name) {
      case 'difenil':
        this.handleDifenil();
      break;
      // case 'hipokalemia-lm-as':
      //   this.handleHipokalemiaLmAs();
      //   break;
      case 'hipokalemia-mg-s':
        this.handleHipokalemiaMgS();
        break;
      default:
        break;
    }
  }

  handleDifenil(){
    this.altWeight = this.weight > this.compData.maxWeight ? this.compData.maxWeight : this.weight;
  }

  // handleHipokalemiaLmAs(){
  //   this.altWeight = this.weight > this.compData.maxWeight ? this.compData.maxWeight : this.weight;
  // }

  handleHipokalemiaMgS(){
    // this.altWeight = this.weight > this.compData.maxWeight ? this.compData.maxWeight : this.weight;
    if(!this.hipokalemiaMgSVia || !this.hipokalemiaMgSRel) return;
    this.compData['choice'] = {
      K: this.compData[this.hipokalemiaMgSRel].K,
      via: this.compData[this.hipokalemiaMgSRel][this.hipokalemiaMgSVia],
    }
    this.compData['result'] = {
      kMin: this.compData.choice.K.min * this.weight > this.compData.choice.K.maxMeq ? this.compData.choice.K.maxMeq :  this.compData.choice.K.min * this.weight,
      kMax: this.compData.choice.K.max * this.weight > this.compData.choice.K.maxMeq ? this.compData.choice.K.maxMeq :  this.compData.choice.K.max * this.weight,
      viaMin: this.compData.choice.via.min * this.weight > this.compData.choice.via.maxMeq ? this.compData.choice.via.maxMeq :  this.compData.choice.via.min * this.weight,
      viaMax: this.compData.choice.via.max * this.weight > this.compData.choice.via.maxMeq ? this.compData.choice.via.maxMeq :  this.compData.choice.via.max * this.weight,
      goteo: this.compData.goteo[this.hipokalemiaMgSVia],
    }
    console.log('handleHipokalemiaMgS compData', this.compData);


  }

}

