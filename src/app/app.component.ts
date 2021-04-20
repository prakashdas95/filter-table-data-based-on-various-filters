import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest } from 'rxjs';

import { startWith } from 'rxjs/operators';

export interface FORM {
  firstName: string;
  lastName: string;
  company: string;
  status: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'company', 'status'];
  dataSource;

  status = ['Professional', 'holiday', 'student'];

  TABLEDATA: FORM[] = [
    { firstName: 'prakash', lastName: 'das', company: 'abc', status: 'Professional' },
    { firstName: 'das', lastName: 'das', company: 'hhh', status: 'holiday' },
    { firstName: 'rahul', lastName: 'das', company: 'abc', status: 'holiday' },
    { firstName: 'hhhh', lastName: 'das', company: 'abc', status: 'Professional' },
    { firstName: 'suraj', lastName: 'sharma', company: 'abc', status: 'student' },
    { firstName: 'prince', lastName: 'kumar', company: 'abc', status: 'student' },
  ];

  multiSelect = new FormControl();


  contactform: FormGroup;

  constructor() { }

  ngOnInit() {
    this.contactform = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      company: new FormControl(null),
      status: new FormControl(null),
      multiSelect: new FormControl(null),
    });

    combineLatest([
      this.contactform.get("firstName").valueChanges.pipe(startWith('')),
      this.contactform.get("lastName").valueChanges.pipe(startWith('')),
      this.contactform.get("company").valueChanges.pipe(startWith('')),
      this.contactform.get("status").valueChanges.pipe(startWith('')),
      this.contactform.get("multiSelect").valueChanges.pipe(startWith('')),
    ]).subscribe((value) => {
      const [firstName, lastName, company, status, multiSelect] = value;
      let data = this.TABLEDATA;

      if (firstName) {
        data = data.filter(item => item.firstName.includes(firstName));
      }
      if (lastName) {
        data = data.filter(item => item.lastName.includes(lastName));
      }
      if (company) {
        data = data.filter(item => item.company.includes(company));
      }

      if (status) {
        data = data.filter(item => status === 'none' ? item : item.status.includes(status));
      }

      if (multiSelect) {
        data = data.filter(item => multiSelect.length === 0 ? item : multiSelect.includes(item.status));
      }

      this.dataSource = data;
    });
 
  }
}