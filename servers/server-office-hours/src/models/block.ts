import {prop, Typegoose} from 'typegoose';

class Block extends Typegoose {
    @prop({required: true})
    start: Date;

    @prop({required: true})
    duration: number;

    @prop({required: true})
    meetingDuration: number;

    @prop({required: true})
    courseSections: string[];

    @prop({required: true})
    repeating: RepetitionInterval;

    @prop({required: false})
    end: Date;

    @prop({required: false})
    exceptions: Date[];
}

enum RepetitionInterval {
    NONE = 'none',
    WEEKLY = 'weekly',
    BIWEEKLY = 'biweekly',
}

export default Block;
