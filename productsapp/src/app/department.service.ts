import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from './department';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  readonly url = "http://localhost:3000/departments";

  constructor(private http: HttpClient) { }

  get(): Observable<Department[]> {
    return this.http.get<Department[]>(this.url);
  }

  add(department: Department): Observable<Department> {
    return this.http.post<Department>(this.url, department);
  }
}
