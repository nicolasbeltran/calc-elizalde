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
      case 'hipokalemia-lm-as':
        this.handleHipokalemiaLmAs();
        break;
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

  handleHipokalemiaLmAs(){
    this.compData['result'] = {
      headerMin: this.compData.header.min * this.weight > this.compData.header.maxMeq ? this.compData.header.maxMeq :  this.compData.header.min *  this.weight,
      headerMax: this.compData.header.max * this.weight > this.compData.header.maxMeq ? this.compData.header.maxMeq :  this.compData.header.max *  this.weight,
      kaonMin: this.compData.kaon.min * this.weight > this.compData.kaon.maxMeq ? this.compData.kaon.maxMeq :  this.compData.kaon.min *  this.weight,
      kaonMax: this.compData.kaon.max * this.weight > this.compData.kaon.maxMeq ? this.compData.kaon.maxMeq :  this.compData.kaon.max *  this.weight,
      clK1a1Min: this.compData.ClK1a1.min * this.weight > this.compData.ClK1a1.maxMeq ? this.compData.ClK1a1.maxMeq :  this.compData.ClK1a1.min *  this.weight,
      clK1a1Max: this.compData.ClK1a1.max * this.weight > this.compData.ClK1a1.maxMeq ? this.compData.ClK1a1.maxMeq :  this.compData.ClK1a1.max *  this.weight,
      clK1a3Min: this.compData.ClK1a3.min * this.weight > this.compData.ClK1a3.maxMeq ? this.compData.ClK1a3.maxMeq :  this.compData.ClK1a3.min *  this.weight,
      clK1a3Max: this.compData.ClK1a3.max * this.weight > this.compData.ClK1a3.maxMeq ? this.compData.ClK1a3.maxMeq :  this.compData.ClK1a3.max *  this.weight,
    }
  }

  handleHipokalemiaMgS(){
    this.compData['resultHeader'] = {
      headerMin: this.compData.header.min * this.weight > this.compData.header.maxMeq ? this.compData.header.maxMeq :  this.compData.header.min *  this.weight,
      headerMax: this.compData.header.max * this.weight > this.compData.header.maxMeq ? this.compData.header.maxMeq :  this.compData.header.max *  this.weight,
    }
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
  }

}

