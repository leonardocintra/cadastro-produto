import { Component, OnInit } from '@angular/core';
import { Department } from '../department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  depName: string = '';
  departments: Department[] = [{
    name: "doces"
  }];

  constructor() { }

  ngOnInit(): void {
  }

  cancel() {}

  save() {}

  edit(dep: Department) {}

  delete(dep: Department) {}

}
