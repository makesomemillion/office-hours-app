import {prop, Typegoose} from 'typegoose';

class Course extends Typegoose {
  // @prop()
  //     // tslint:disable-next-line:variable-name
  // _id: string;

  @prop({required: true})
  departmentCode: string;

  @prop({required: true})
  number: string;

  @prop({required: true})
  name: string;
}

export default Course;
