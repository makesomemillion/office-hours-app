import {prop, Ref, Typegoose} from 'typegoose';
import Meeting from './meeting';
import * as mongoose from 'mongoose';

class Comment extends Typegoose {
    @prop({required: true})
    author: mongoose.Types.ObjectId;

    @prop({required: true})
    timestamp: Date;

    @prop({required: true})
    content: string;

    @prop({required: true, ref: Meeting})
    meeting: Ref<Meeting>;
}

export default Comment;
