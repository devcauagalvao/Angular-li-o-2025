import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './student';
import { Course } from './course';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  apiUrl = 'http://localhost:3000/students';

  courseUrl = 'http://localhost:3000/courses'

  constructor(private http: HttpClient) {}

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getSelect(): Observable<Course[]> {
    return this.http.get<Course[]>(this.courseUrl);
  }

  save(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  delete(student: Student): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${student.id}`);
  }

  update(student:Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${student.id}`, student);
  }
}