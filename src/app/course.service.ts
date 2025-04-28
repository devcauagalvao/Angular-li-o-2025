
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
apiUrl = 'http://localhost:3000/courses';


  constructor(private http: HttpClient) {}

  getAllCourse(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

 

  saveCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  deleteCourse(course: Course): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${course.id}`);
  }

  updateCourse(course:Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course);
  }
  
  editCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course);
  }

  

}