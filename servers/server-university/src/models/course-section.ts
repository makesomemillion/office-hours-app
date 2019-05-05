import {arrayProp, prop, Ref, Typegoose} from 'typegoose';
import CourseOffering from './course-offering';
import Person from './person';

class CourseSection extends Typegoose {
  @prop({required: true, ref: CourseOffering})
  courseOffering: Ref<CourseOffering>;

  @prop({required: true})
  activity: Activity;

  @prop({required: true})
  number: string;

  @arrayProp({itemsRef: Person})
  instructorsIds: Ref<Person>[];

  @arrayProp({itemsRef: Person})
  teachingAssistantsIds: Ref<Person>[];

  @arrayProp({itemsRef: Person})
  studentsIds: Ref<Person>[];
}

const enum Activity {
  LECTURE = 'lecture',
  PRACTICAL = 'practical',
  TUTORIAL = 'tutorial',
}

export default CourseSection;
