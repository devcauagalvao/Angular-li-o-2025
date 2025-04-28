import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course',
  standalone: false,
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent implements OnInit {
  Courses: Course[] = [];
  formGroupCourse: FormGroup;
  IsEditMode: boolean = false;
  currentCourseId: number | null = null;

  constructor(
    private service: CourseService,
    private formBuilder: FormBuilder
  ) {
    this.formGroupCourse = formBuilder.group({
      id: [''],
      course: [''],
      abbreviation: [''],
      axis: [''],
      schedule: [''],
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

  editCourse(course: Course) {
    this.IsEditMode = true;
    this.currentCourseId = course.id;
    this.formGroupCourse.patchValue({
      id: course.id,
      course: course.course,
      abbreviation: course.abbreviation,
      axis: course.axis,
      schedule: course.schedule,
    });
  }








  closeEditMode() {
    this.IsEditMode = false;
    this.formGroupCourse.reset();
  }



  updateCourse() {
    const updateCourse = this.formGroupCourse.value;
    this.service.updateCourse(updateCourse).subscribe({
      next: () => {
        this.loadCourse();
        this.closeEditMode();
      },
    });
  }
}
