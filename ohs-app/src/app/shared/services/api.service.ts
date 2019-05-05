import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {NoteModel} from '../models/note.model';
import {MeetingModel} from '../models/meeting.model';
import {CourseModel} from '../models/course.model';
import {CourseOfferingModel} from '../models/course-offering.model';
import {CourseSectionModel} from '../models/course-section.model';
import {BlockModel} from '../models/block.model';
import {CommentModel} from '../models/comment.model';
import {PersonModel} from '../models/person.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private headers = new HttpHeaders().set('Application-Content', 'application/json; charset=utf-8');

    constructor(
        private http: HttpClient
    ) {
    }

    getBlocks(sectionId: string = ''): Observable<Array<BlockModel>> {
        const params = new HttpParams().append('section', sectionId);

        return this.http
            .get(
                `${environment.officeHoursServerApiRoot}/blocks`,
                {headers: this.headers, params}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.blocks as Array<BlockModel>),
                tap(blocks => blocks.forEach(block => block.start = new Date(block.start))),
                tap(blocks => blocks.forEach(block => block.end = new Date(block.end))),
            );
    }

    getBlocksForPerson(personId: string): Observable<Array<BlockModel>> {
        return this.http
            .get(
                `${environment.officeHoursServerApiRoot}/people/${personId}/blocks`,
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.blocks as Array<BlockModel>),
                tap(blocks => blocks.forEach(block => block.start = new Date(block.start))),
                tap(blocks => blocks.forEach(block => block.end = new Date(block.end))),
            );
    }

    postBlock(block: BlockModel): Observable<BlockModel> {
        return this.http
            .post(
                `${environment.officeHoursServerApiRoot}/blocks`,
                {block},
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.block as BlockModel)
            );
    }

    getBlock(blockId: string): Observable<BlockModel> {
        return this.http
            .get(
                `${environment.officeHoursServerApiRoot}/blocks/${blockId}`,
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.block as BlockModel),
                tap(block => block.start = new Date(block.start)),
                tap(block => block.end = new Date(block.end)),
            );
    }

    updateBlock(block: BlockModel): Observable<BlockModel> {
        return this.http
            .put(
                `${environment.officeHoursServerApiRoot}/blocks/${block._id}`,
                {block},
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.block as BlockModel)
            );
    }

    deleteBlock(blockId: string): Observable<BlockModel> {
        return this.http
            .delete(
                `${environment.officeHoursServerApiRoot}/blocks/${blockId}`,
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.block as BlockModel)
            );
    }

    getMeetings(sectionId: string = ''): Observable<Array<MeetingModel>> {
        const params = new HttpParams().append('section', sectionId);

        return this.http
            .get(
                `${environment.officeHoursServerApiRoot}/meetings`,
                {headers: this.headers, params}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.meetings as Array<MeetingModel>),
                tap(meetings => meetings.forEach(meeting => meeting.start = new Date(meeting.start))),
            );
    }

    getMeetingsForPerson(personId: string): Observable<Array<MeetingModel>> {
        return this.http
            .get(
                `${environment.officeHoursServerApiRoot}/people/${personId}/meetings`,
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.meetings as Array<MeetingModel>),
                tap(meetings => meetings.forEach(meeting => meeting.start = new Date(meeting.start))),
            );
    }

    postMeeting(meeting: MeetingModel): Observable<MeetingModel> {
        return this.http
            .post(
                `${environment.officeHoursServerApiRoot}/meetings`,
                {meeting},
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.meeting as MeetingModel)
            );
    }

    getMeeting(meetingId: string): Observable<MeetingModel> {
        return this.http
            .get(
                `${environment.officeHoursServerApiRoot}/meetings/${meetingId}`,
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.meeting as MeetingModel),
                tap(meeting => meeting.start = new Date(meeting.start)),
            );
    }

    updateMeeting(meeting: MeetingModel): Observable<MeetingModel> {
        return this.http
            .put(
                `${environment.officeHoursServerApiRoot}/meetings/${meeting._id}`,
                {meeting},
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.meeting as MeetingModel)
            );
    }

    deleteMeeting(meetingId: string): Observable<MeetingModel> {
        return this.http
            .delete(
                `${environment.officeHoursServerApiRoot}/meetings/${meetingId}`,
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.meeting as MeetingModel)
            );
    }

    getCommentsForMeeting(meetingId: string): Observable<Array<CommentModel>> {
        return this.http
            .get(
                `${environment.officeHoursServerApiRoot}/meetings/${meetingId}/comments`,
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.comments as Array<CommentModel>),
                tap(comments => comments.forEach(comment => comment.timestamp = new Date(comment.timestamp)))
            );
    }

    postComment(meetingId: string, comment: CommentModel): Observable<CommentModel> {
        return this.http
            .post(
                `${environment.officeHoursServerApiRoot}/meetings/${meetingId}/comments`,
                {comment},
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.comment as CommentModel)
            );
    }

    getNotesForMeeting(meetingId: string): Observable<Array<NoteModel>> {
        return this.http
            .get(
                `${environment.officeHoursServerApiRoot}/meetings/${meetingId}/notes`,
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.notes as Array<NoteModel>),
                tap(notes => notes.forEach(note => note.timestamp = new Date(note.timestamp)))
            );
    }

    postNote(meetingId: string, note: NoteModel): Observable<NoteModel> {
        return this.http
            .post(
                `${environment.officeHoursServerApiRoot}/meetings/${meetingId}/notes`,
                {note},
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.note as NoteModel)
            );
    }

    getComments(filter: string = '', studentId: string = ''): Observable<Array<CommentModel>> {
        return this.http
            .get(
                `${environment.officeHoursServerApiRoot}/comments`,
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.comments as Array<CommentModel>),
                tap(comments => comments.forEach(comment => comment.timestamp = new Date(comment.timestamp)))
            );
    }

    updateComment(comment: CommentModel): Observable<CommentModel> {
        return this.http
            .put(
                `${environment.officeHoursServerApiRoot}/comments/${comment._id}`,
                {comment},
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.comment as CommentModel)
            );
    }

    deleteComment(commentId: string): Observable<CommentModel> {
        return this.http
            .delete(
                `${environment.officeHoursServerApiRoot}/comments/${commentId}`,
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.comment as CommentModel)
            );
    }

    getNotes(filter: string = '', studentId: string = ''): Observable<Array<NoteModel>> {
        return this.http
            .get(
                `${environment.officeHoursServerApiRoot}/notes`,
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.notes as Array<NoteModel>),
                tap(notes => notes.forEach(note => note.timestamp = new Date(note.timestamp)))
            );
    }

    updateNote(note: NoteModel): Observable<NoteModel> {
        return this.http
            .put(
                `${environment.officeHoursServerApiRoot}/notes/${note._id}`,
                {note},
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.note as NoteModel)
            );
    }

    deleteNote(noteId: string): Observable<NoteModel> {
        return this.http
            .delete(
                `${environment.officeHoursServerApiRoot}/notes/${noteId}`,
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.note as NoteModel)
            );
    }

    getPeople(filter: string = ''): Observable<Array<PersonModel>> {
        const params = new HttpParams().append('filter', filter);

        return this.http
            .get(
                `${environment.universityServerApiRoot}/people`,
                {headers: this.headers, params}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.people as Array<PersonModel>)
            );
    }

    getPerson(personId: string): Observable<PersonModel> {
        return this.http
            .get(
                `${environment.universityServerApiRoot}/people/${personId}`,
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.person as PersonModel)
            );
    }

    deletePerson(personId: string): Observable<PersonModel> {
        return this.http
            .delete(
                `${environment.universityServerApiRoot}/people/${personId}`,
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.person as PersonModel)
            );
    }

    postPerson(person: PersonModel): Observable<PersonModel> {
        return this.http
            .post(
                `${environment.universityServerApiRoot}/people`,
                {person},
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.person as PersonModel)
            );
    }

    updatePerson(person: PersonModel): Observable<PersonModel> {
        return this.http
            .put(
                `${environment.universityServerApiRoot}/people/${person._id}`,
                {person},
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.person as PersonModel)
            );
    }

    getCourses(filter: string = ''): Observable<Array<CourseModel>> {
        const params = new HttpParams().append('filter', filter);

        return this.http
            .get(
                `${environment.universityServerApiRoot}/courses`,
                {headers: this.headers, params}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.courses as Array<CourseModel>)
            );
    }

    getCourse(courseId: string): Observable<CourseModel> {
        return this.http
            .get(
                `${environment.universityServerApiRoot}/courses/${courseId}`,
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.course as CourseModel)
            );
    }

    deleteCourse(courseId: string): Observable<CourseModel> {
        return this.http
            .delete(
                `${environment.universityServerApiRoot}/courses/${courseId}`,
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.course as CourseModel)
            );
    }

    postCourse(course: CourseModel): Observable<CourseModel> {
        return this.http
            .post(
                `${environment.universityServerApiRoot}/courses`,
                {course},
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.course as CourseModel)
            );
    }

    updateCourse(course: CourseModel): Observable<CourseModel> {
        return this.http
            .put(
                `${environment.universityServerApiRoot}/courses/${course._id}`,
                {course},
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.course as CourseModel)
            );
    }

    getCourseOfferings(courseId: string, filter: string = ''): Observable<Array<CourseOfferingModel>> {
        const params = new HttpParams().append('filter', filter);

        return this.http
            .get(
                `${environment.universityServerApiRoot}/courses/${courseId}/offerings`,
                {headers: this.headers, params}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.courseOfferings as Array<CourseOfferingModel>)
            );
    }

    getCourseOffering(courseId: string, offeringId: string): Observable<{ course: CourseModel, offering: CourseOfferingModel }> {
        return this.http
            .get(
                `${environment.universityServerApiRoot}/courses/${courseId}/offerings/${offeringId}`,
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => ({
                    // @ts-ignore
                    course: resp.course as CourseModel,
                    // @ts-ignore
                    offering: resp.courseOffering as CourseOfferingModel
                }))
            );
    }

    postCourseOffering(courseOffering: CourseOfferingModel): Observable<CourseOfferingModel> {
        return this.http
            .post(
                `${environment.universityServerApiRoot}/courses/${courseOffering.course}/offerings`,
                {courseOffering},
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.courseOffering as CourseOfferingModel)
            );
    }

    updateCourseOffering(offering: CourseOfferingModel): Observable<CourseOfferingModel> {
        return this.http
            .put(
                `${environment.universityServerApiRoot}/courses/${offering.course}/offerings/${offering._id}`,
                {courseOffering: offering},
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.courseOffering as CourseOfferingModel)
            );
    }

    deleteCourseOffering(courseId: string, offeringId: string): Observable<CourseOfferingModel> {
        return this.http
            .delete(
                `${environment.universityServerApiRoot}/courses/${courseId}/offerings/${offeringId}`,
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.courseOffering as CourseOfferingModel)
            );
    }

    getCourseSections(courseId: string, offeringId: string, filter: string = ''): Observable<Array<CourseSectionModel>> {
        const params = new HttpParams().append('filter', filter);

        return this.http
            .get(
                `${environment.universityServerApiRoot}/courses/${courseId}/offerings/${offeringId}/sections`,
                {headers: this.headers, params}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.courseSections as Array<CourseSectionModel>)
            );
    }

    getCourseSectionsForPerson(personId: string, filter: string = ''): Observable<Array<CourseSectionModel>> {
        const params = new HttpParams().append('filter', filter);

        return this.http
            .get(
                `${environment.universityServerApiRoot}/people/${personId}/sections`,
                {headers: this.headers, params}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.courseSections as Array<CourseSectionModel>)
            );
    }

    getCourseSection(courseId: string, offeringId: string, sectionId: string): Observable<CourseSectionModel> {
        return this.http
            .get(
                `${environment.universityServerApiRoot}/courses/${courseId}/offerings/${offeringId}/sections/${sectionId}`,
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.courseSection as CourseSectionModel)
            );
    }

    postCourseSection(courseId: string, courseSection: CourseSectionModel) {
        return this.http
            .post(
                `${environment.universityServerApiRoot}/courses/${courseId}/offerings/${courseSection.courseOffering}/sections`,
                {courseSection},
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.courseSection as CourseSectionModel)
            );
    }

    updateCourseSection(courseId: string, section: CourseSectionModel) {
        return this.http
            .put(
                `${environment.universityServerApiRoot}/courses/${courseId}/offerings/${section.courseOffering}/sections/${section._id}`,
                {courseSection: section},
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.courseSection as CourseSectionModel)
            );
    }

    deleteCourseSection(courseId: string, offeringId: string, sectionId: string): Observable<CourseSectionModel> {
        return this.http
            .delete(
                `${environment.universityServerApiRoot}/courses/${courseId}/offerings/${offeringId}/sections/${sectionId}`,
                {headers: this.headers}
            )
            .pipe(
                // @ts-ignore
                map(resp => resp.courseSection as CourseSectionModel)
            );
    }
}
