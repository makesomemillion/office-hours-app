import {arrayProp, prop, Ref, Typegoose} from 'typegoose';
import Note from './note';
import Comment from './comment';
import * as mongoose from "mongoose";

class Meeting extends Typegoose {
    @prop({required: true})
    start: Date;

    @prop({required: true})
    duration: number;

    @prop({required: false})
    isCancelled: boolean;

    @arrayProp({items: mongoose.Types.ObjectId, required: true})
    teachingStaff: mongoose.Types.ObjectId[];

    @arrayProp({items: mongoose.Types.ObjectId, required: true})
    students: mongoose.Types.ObjectId[];

    @prop({required: true})
    courseSection: mongoose.Types.ObjectId;

    @arrayProp({itemsRef: Comment})
    comments: Ref<Comment>[];

    @arrayProp({itemsRef: Note})
    notes: Ref<Note>[];
}

export default Meeting;
