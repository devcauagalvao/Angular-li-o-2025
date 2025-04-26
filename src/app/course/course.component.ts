import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course',
  standalone: false,
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit {
  Courses: Course[] = [];
  formGroupCourse: FormGroup;


  constructor(
      private service: CourseService,
      private formBuilder: FormBuilder
    ) {
      this.formGroupCourse = formBuilder.group({
        id: [''],
        course: [''],
      });
    }
  
    ngOnInit(): void {
      this.loadCourse();
    
    }
  
    loadCourse() {
      this.service.getAllCourse().subscribe({
        next: (json) => (this.Courses = json),
      });
    }
  
  
    saveCourse() {
      this.service.saveCourse(this.formGroupCourse.value).subscribe({
        next: (json) => {
          this.Courses.push(json);
          this.formGroupCourse.reset();
        },
      });
    }
  
    deleteCourse(course: Course) {
      this.service.deleteCourse(course).subscribe({
        next: () => this.loadCourse(),
      });
    }
  
    updateCourse(course: Course) {
      this.service.updateCourse(course).subscribe({
        next: () => this.loadCourse(),
      });
    }

}
