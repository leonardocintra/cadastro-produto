import { Component, OnInit } from '@angular/core';
import { Department } from '../department';
import { DepartmentService } from '../department.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  depName: string = '';
  departments: Department[] = [];
  depEdit: Department = null;

  private unsubiscribe$: Subject<any> = new Subject();

  constructor(
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.departmentService.get()
      .pipe(takeUntil(this.unsubiscribe$))
      .subscribe((deps) => this.departments = deps);
  }

  clearFields() {
    this.depName = "";
    this.depEdit = null;
  }

  notify(message: string) {
    this.snackBar.open(message, "OK", { duration: 3000 });
  }

  cancel() { }

  save() {
    if (this.depEdit) {
      this.departmentService.update({
        name: this.depName,
        _id: this.depEdit._id
      }).subscribe((dep) => {
        this.notify("Atualizado com sucesso!");
        this.clearFields();
        this.depEdit = null;
      }, (err) => {
        this.notify("Error: " + err);
      })
    } else {
      this.departmentService.add({
        name: this.depName
      }).subscribe((dep) => {
        this.notify("Salvo com sucesso!");
        this.clearFields();
      }, (err) => console.log(err));
    }
  }

  edit(department: Department) {
    this.depName = department.name;
    this.depEdit = department;
  }

  delete(department: Department) {
    this.departmentService.del(department)
      .subscribe(() => this.notify("Removido"), (err) => console.log(err));
  }

  ngOnDestroy() {
    this.unsubiscribe$.next();
  }

}
