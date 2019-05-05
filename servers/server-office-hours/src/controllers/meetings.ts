import * as express from 'express';
import Meeting from '../models/meeting';
import Comment from '../models/comment';
import Note from '../models/note';
import * as mongoose from 'mongoose';
import {ObjectID} from 'bson';
import ObjectId = mongoose.Types.ObjectId;

const router = express.Router();

const MeetingModel = new Meeting().getModelForClass(Meeting, {schemaOptions: {versionKey: false}});
const CommentModel = new Comment().getModelForClass(Comment, {schemaOptions: {versionKey: false}});
const NoteModel = new Note().getModelForClass(Note, {schemaOptions: {versionKey: false}});

router.get('/', (req, res) => {
    const sectionId = req.query.section;

    MeetingModel
        .find()
        .then(meetings => res.send({meetings}));
});

router.post('/', (req, res) => {
    const meeting = req.body.meeting;
    delete meeting._id;
    meeting.teachingStaff = meeting.teachingStaff.map(it => new ObjectId(it));
    meeting.students = meeting.students.map(it => new ObjectId(it));
    meeting.courseSection = new ObjectId(meeting.courseSection);

    const meetingModel = new MeetingModel(meeting);
    meetingModel
        .save()
        .then(insertedMeeting => res.status(201).send({meeting: insertedMeeting}));
});

router.get('/:meetingId', (req, res) => {
    const meetingId = req.params.meetingId;

    MeetingModel
        .aggregate([
            {
                $match: {_id: ObjectId.createFromHexString(meetingId)}
            },
            {
                $lookup: { // Join teaching staff data
                    from: 'people',
                    localField: 'teachingStaff',
                    foreignField: '_id',
                    as: 'teachingStaffData',
                },
            },
            {
                $lookup: { // Join student data
                    from: 'people',
                    localField: 'students',
                    foreignField: '_id',
                    as: 'studentsData',
                },
            },
            {
                $lookup: { // Join course section data
                    from: 'coursesections',
                    localField: 'courseSection',
                    foreignField: '_id',
                    as: 'courseSectionData',
                },
            },
            {
                $unwind: '$courseSectionData',
            },
            {
                $lookup: // Join course offering data
                    {
                        from: 'courseofferings',
                        localField: 'courseSectionData.courseOffering',
                        foreignField: '_id',
                        as: 'courseOfferingData'
                    }
            },
            {
                $unwind: '$courseOfferingData'
            },
            {
                $lookup: // Join course data
                    {
                        from: 'courses',
                        localField: 'courseOfferingData.course',
                        foreignField: '_id',
                        as: 'courseData'
                    }
            },
            {
                $unwind: '$courseData'
            },
            {
                $lookup: // Join comments data
                    {
                        from: 'comments',
                        localField: '_id',
                        foreignField: 'meeting',
                        as: 'commentsData'
                    }
            },
            {
                $lookup: // Join notes data
                    {
                        from: 'notes',
                        localField: '_id',
                        foreignField: 'meeting',
                        as: 'notesData'
                    }
            },
        ])
        .then(([meeting]) => res.send({meeting}));
});

router.put('/:meetingId', (req, res) => {
    const meetingId = req.params.meetingId;
    const meeting = req.body.meeting;
    delete meeting._id;

    MeetingModel
        .findByIdAndUpdate(meetingId, meeting)
        .then(newMeeting => res.send({meeting: newMeeting}));
});

router.delete('/:meetingId', (req, res) => {
    const meetingId = req.params.meetingId;

    MeetingModel
        .findByIdAndDelete(meetingId)
        .then(meeting => res.send({meeting}));
});

router.get('/:meetingId/comments', (req, res) => {
    const meetingId = req.params.meetingId;

    CommentModel
        .aggregate([
            {
                $match: {meeting: ObjectId.createFromHexString(meetingId)}
            },
            {
                $lookup: {
                    from: 'people',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'authorData',
                },
            },
            {
                $unwind: '$authorData',
            },
        ])
        .then(comments => res.send({comments}));
});

router.post('/:meetingId/comments', (req, res) => {
    const meetingId = req.params.meetingId;
    const comment = req.body.comment;
    delete comment._id;
    comment.meeting = ObjectId.createFromHexString(meetingId);
    comment.author = ObjectId.createFromHexString(comment.author);
    comment.timestamp = Date.now();

    const commentModel = new CommentModel(comment);
    commentModel
        .save()
        .then(insertedComment => res.status(201).send({comment: insertedComment}));
});

router.get('/:meetingId/notes', (req, res) => {
    const meetingId = req.params.meetingId;

    NoteModel
        .aggregate([
            {
                $match: {meeting: ObjectId.createFromHexString(meetingId)}
            },
            {
                $lookup: {
                    from: 'people',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'authorData',
                },
            },
            {
                $unwind: '$authorData',
            },
        ])
        .then(notes => res.send({notes}));
});

router.post('/:meetingId/notes', (req, res) => {
    const meetingId = req.params.meetingId;
    const note = req.body.note;
    delete note._id;
    note.meeting = ObjectId.createFromHexString(meetingId);
    note.author = ObjectId.createFromHexString(note.author);
    note.timestamp = Date.now();

    const noteModel = new NoteModel(note);
    noteModel
        .save()
        .then(insertedNote => res.status(201).send({note: insertedNote}));
});

export default router;
