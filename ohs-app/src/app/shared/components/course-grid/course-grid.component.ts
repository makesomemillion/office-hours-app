import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CourseSectionModel} from '../../models/course-section.model';
import {ApiService} from '../../services/api.service';
import {AuthService} from '../../../auth/services/auth.service';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
    selector: 'ohs-course-grid',
    templateUrl: './course-grid.component.html',
    styleUrls: ['./course-grid.component.scss']
})
export class CourseGridComponent implements OnInit {
    sections: Array<CourseSectionModel> = [];

    selection: SelectionModel<CourseSectionModel> = new SelectionModel(true);

    @Output() courseSelection = new EventEmitter<Array<CourseSectionModel>>();

    constructor(private api: ApiService, private auth: AuthService) {}

    ngOnInit() {
        const id = this.auth.getUserInfo() && this.auth.getUserInfo().id;

        this.api
            .getCourseSectionsForPerson(id)
            .subscribe(sections => (this.sections = sections));
    }

    onToggleCourseSelection(course: CourseSectionModel) {
        this.selection.toggle(course);
        this.courseSelection.emit(this.selection.selected);
    }

    isNotSelected(course: CourseSectionModel) {
        return (
            !this.selection.isSelected(course) &&
            this.selection.selected.length !== 0
        );
    }

    public clearSelection() {
        this.selection.clear();
        this.courseSelection.emit(this.selection.selected);
    }
}
