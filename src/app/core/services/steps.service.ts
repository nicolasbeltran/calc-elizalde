import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepsService {

  steps$ = new Subject<any>();

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
        options: [
          {
            label: 'Potasio',
            key: 'potasio',
            disabled: true,
          },
          {
            label: 'Convulsiones',
            key: 'conv-options',
            disabled: false,
          }
        ]
      },
      {
        name: 'conv-options',
        label: 'Convulsiones',
        type: 'options',
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
      {
        name: 'difenil',
        label: 'Difenilhidantoina',
        type: 'result',
      }
    ]
  }
}
