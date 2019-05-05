import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from '../../../shared/services/api.service';
import {CourseModel} from '../../../shared/models/course.model';
import {CourseOfferingModel} from '../../../shared/models/course-offering.model';
import {CourseSectionModel} from '../../../shared/models/course-section.model';
import { PersonModel } from '../../../shared/models/person.model';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'ohs-csv-dialog',
  templateUrl: './csv-dialog.component.html',
  styleUrls: ['./csv-dialog.component.scss']
})
export class CsvDialogComponent implements OnInit {

  form: FormGroup;
  courses: CourseModel[];
  offerings: CourseOfferingModel[];
  sections: CourseSectionModel[];

  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<CsvDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
    private papa: Papa,
  ) { 
    this.form = this.formBuilder.group({
        course: '',
        courseOffering: '',
        courseSection: '',
        csvFile: undefined,
    });
  }

  ngOnInit() {
    this.api.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  onPeopleCreated(){
    console.log(this.form.value)
  }

  onCSVParseComplete(result) {
    // TODO: Make this work
    this.dialogRef.close();
    /*
    // TODO: Create a Post Persons(S) call to create multiple people
    // And return the _ids of the people created

    // Mock student Ids
    const people = result.data;
    let studentIds: string[] = [];
    
    for (let i=0; i < people.length; i++){
      // TODO: Should be acutal _ids
      // const firstName = people[i][0];
      // const lastName = people[i][1];
      const id = people[i][2]
      // const csv_person = {
      //   firstName: firstName,
      //   lastName: lastName,
      //   accessLevel: 'student',
      //   username: lastName,
      //   password: lastName,
      //   email: firstName + "@email.com",
      // } as PersonModel

      studentIds.push(id);
    }
    const courseId = this.form.value.course;
    const courseSectionId = this.form.value.courseSection;
    let courseSectionModel = this.sections.find( section => section._id === courseSectionId );
    // Add studentIds
    courseSectionModel.studentsIds = courseSectionModel.studentsIds.concat(studentIds);
    this.api
        .updateCourseSection(courseId, courseSectionModel)
        .subscribe(
            () => this.dialogRef.close(),
            (error) => {
                console.log(error);
                this.dialogRef.close();
            }
        );
    */
  }

  upload(){
    const csvForm = this.form.value;
    let file = csvForm.csvFile.files[0];
    console.log(file);
    let configObject = {
      complete: this.onCSVParseComplete.bind(this),
      error: function(error, file) {
        console.log("An Error occured while parsing csv", error, file);
      },
    }
    this.papa.parse(file, configObject);
  }

  onClassChange() {
    this.api.getCourseOfferings(this.form.controls.course.value).subscribe(offerings => {
        this.offerings = offerings;
    });
  }

  onOfferingChange() {
      this.api.getCourseSections(this.form.controls.course.value, this.form.controls.courseOffering.value)
          .subscribe(sections => {
              this.sections = sections;
          });
  }

}
