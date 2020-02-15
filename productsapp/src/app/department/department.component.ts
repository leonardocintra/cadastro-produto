import { Component, OnInit } from '@angular/core';
import { Department } from '../department';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  depName: string = '';
  departments: Department[] = [];

  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.departmentService.get()
      .subscribe((deps) => this.departments = deps);
  }

  clearFields() {
    this.depName = "";
  }

  cancel() { }

  save() {
    this.departmentService.add({
      name: this.depName
    }).subscribe((dep) => {
      console.log(dep);
      this.clearFields();
    }, (err) => console.log(err));
  }

  edit(dep: Department) { }

  delete(dep: Department) { }

}
