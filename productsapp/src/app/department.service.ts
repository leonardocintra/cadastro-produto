import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from './department';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  readonly url = "http://localhost:3000/departments";
  private departmentSubject$: BehaviorSubject<Department[]> = new BehaviorSubject<Department[]>(null);
  private loadedDepartment: boolean = false;

  constructor(private http: HttpClient) { }

  get(): Observable<Department[]> {
    if (!this.loadedDepartment) {
      this.http.get<Department[]>(this.url)
        .pipe(tap((deps) => {
          console.log(deps);
        }))
        .subscribe(this.departmentSubject$);

      this.loadedDepartment = true;
    }

    return this.departmentSubject$.asObservable();
  }

  add(department: Department): Observable<Department> {
    return this.http.post<Department>(this.url, department)
      .pipe(tap((dep: Department) => this.departmentSubject$.getValue().push(dep)))
  }

  del(department: Department): Observable<any> {
    return this.http.delete(`${this.url}/${department._id}`)
      .pipe(tap(() => {
        let departments = this.departmentSubject$.getValue();
        let i = departments.findIndex(d => d._id === department._id);
        if (i >= 0) {
          departments.splice(i, 1);
        }
      }));
  }

  update(department: Department): Observable<Department> {
    return this.http.patch<Department>(`${this.url}/${department._id}`, department)
      .pipe(
        tap((dep) => {
          let departments = this.departmentSubject$.getValue();
          let i = departments.findIndex(d => d._id === department._id);
          if (i >= 0) {
            departments[i].name = dep.name;
          }
        })
      );
  }
}
