import {prop, Ref, Typegoose} from 'typegoose';
import Course from './course';

class CourseOffering extends Typegoose {
  @prop({required: true, ref: Course})
  course: Ref<Course>;

  @prop({required: true})
  year: number;

  @prop({required: true})
  semester: Semester;

  @prop({required: true})
  credits: CreditCount;
}

enum Semester {
  WINTER = 'winter',
  FALL = 'fall',
  FULL_YEAR = 'fullYear',
  SUMMER_FIRST_TERM = 'summerFirstTerm',
  SUMMER_SECOND_TERM = 'summerSecondTerm',
  FULL_SUMMER = 'fullTerm',
}

enum CreditCount {
  HALF_CREDIT = 'halfCredit',
  FULL_CREDIT = 'fullCredit',
}

export default CourseOffering;
