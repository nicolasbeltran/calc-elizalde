import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patient$ = new Subject<any>();

  constructor() { }

  setPatient(patient: any) {
    this.patient$.next(patient);
  }


  getPatient(): Observable<any> {
    return this.patient$.asObservable();
  }
}
