import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student',
  standalone: false,
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent implements OnInit {
  students: Student[] = [];
  courses: any[] = [];
  formGroupStudent: FormGroup;

  constructor(
    private service: StudentService,
    private formBuilder: FormBuilder
  ) {
    this.formGroupStudent = formBuilder.group({
      id: [''],
      name: [''],
      course: [''],
    });
  }

  ngOnInit(): void {
    this.loadStudents();
    this.loadCourses();
  }

  loadCourses() {
    this.service.getSelect().subscribe({
      next: (json) => (this.courses = json),
    });
  }

  loadStudents() {
    this.service.getAll().subscribe({
      next: (json) => (this.students = json),
    });
  }

  save() {
    this.service.save(this.formGroupStudent.value).subscribe({
      next: (json) => {
        this.students.push(json);
        this.formGroupStudent.reset();
      },
    });
  }

  delete(student: Student) {
    this.service.delete(student).subscribe({
      next: () => this.loadStudents(),
    });
  }

  update(student: Student) {
    this.service.update(student).subscribe({
      next: () => this.loadStudents(),
    });
  }
}
