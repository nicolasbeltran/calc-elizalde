import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepsService {

  steps$ = new Subject<any>();
  goBack$ = new Subject<any>();

  constructor() { }

  setStep(stepName: any) {
    this.steps$.next(stepName);
  }

  getStep(): Observable<any> {
    return this.steps$.asObservable();
  }

  get mainSteps() {
    return [
      {
        name: 'home',
        type: 'home',
      },
      {
        name: 'main-options',
        type: 'options',
        prevStep: 'home',
        options: [
          {
            label: 'Potasio',
            key: 'potasio',
            disabled: false,
          },
          {
            label: 'Convulsiones',
            key: 'conv-options',
            disabled: false,
          }
        ]
      },
      {
        name: 'potasio',
        label: 'Potasio',
        type: 'options',
        prevStep: 'main-options',
        options: [
          {
            label: 'Hipokalemia leve/moderada asintomática',
            key: 'hipokalemia-lm-as',
            disabled: false,
          },
          {
            label: 'Hipokalemia grave/moderada sintomática',
            key: 'hipokalemia-mg-s',
            disabled: false,
          },
        ]
      },
      {
        name: 'conv-options',
        label: 'Convulsiones',
        type: 'options',
        prevStep: 'main-options',
        options: [
          {
            label: 'Impreganciones',
            key: 'impr-options',
            disabled: false,
          },
          {
            label: 'Benzodiacepinas',
            key: 'benz-options',
            disabled: true,
          },
        ]
      },
      {
        name: 'impr-options',
        label: 'Impreganciones',
        type: 'options',
        prevStep: 'conv-options',
        options: [
          {
            label: 'Difenilhidantoina',
            key: 'difenil',
            disabled: false,
          },
          {
            label: 'Levetirazetam',
            key: 'leve',
            disabled: true,
          },
          {
            label: 'Ferobarbital',
            key: 'fero',
            disabled: true,
          }
        ]
      },
      {
        name: 'benz-options',
        label: 'Benzodiacepinas',
        type: 'options',
        prevStep: 'conv-options',
        options: [
          {
            label: 'Lorazepam',
            key: 'lorazepam',
            disabled: true,
          },
          {
            label: 'Midazolam',
            key: 'midazolam',
            disabled: true,
          },
          {
            label: 'Diazepam',
            key: 'diazepam',
            disabled: true,
          }
        ]
      },
    ]
  }
}
