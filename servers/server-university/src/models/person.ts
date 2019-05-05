import {prop, Typegoose} from 'typegoose';

class Person extends Typegoose {
  @prop({required: true})
  firstName: string;

  @prop({required: true})
  lastName: string;

  @prop({required: true})
  accessLevel: AccessLevel;

  @prop({required: true, unique: true})
  username: string;

  @prop({required: true})
  password: string;

  @prop({required: true, unique: true})
  email: string;

  @prop()
  token: string;
}

enum AccessLevel {
  STUDENT = 'student',
  TEACHING_ASSISTANT = 'teachingAssistant',
  INSTRUCTOR = 'instructor',
}

export default Person;
