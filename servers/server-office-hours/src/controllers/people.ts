import * as express from 'express';
import {ObjectID} from 'bson';
import Meeting from '../models/meeting';
import Block from '../models/block';

const router = express.Router();

const MeetingModel = new Meeting().getModelForClass(Meeting, {schemaOptions: {versionKey: false}});
const BlockModel = new Block().getModelForClass(Block, {schemaOptions: {versionKey: false}});

router.get('/:personId/meetings', (req, res) => {
    const personId = req.params.personId;

    MeetingModel
        .aggregate([
            {
                $match: {
                    $or: [ // Person is teaching staff or student for meeting.
                        {teachingStaff: ObjectID.createFromHexString(personId)},
                        {students: ObjectID.createFromHexString(personId)},
                    ]
                }
            }, {
                $lookup: {
                    from: 'coursesections',
                    localField: 'courseSection',
                    foreignField: '_id',
                    as: 'courseSectionData'
                }
            },
            {$unwind: '$courseSectionData'}, {
                $lookup: // Join course offering data
                    {
                        from: 'courseofferings',
                        localField: 'courseSectionData.courseOffering',
                        foreignField: '_id',
                        as: 'courseOfferingData'
                    }
            }, {
                $unwind: '$courseOfferingData'
            }, {
                $lookup: // Join course data
                    {
                        from: 'courses',
                        localField: 'courseOfferingData.course',
                        foreignField: '_id',
                        as: 'courseData'
                    }
            }, {
                $unwind: '$courseData'
            }
        ])
        .then(meetings => res.send({meetings}));
});

router.get('/:personId/blocks', (req, res) => {
    const personId = req.params.personId;

    BlockModel
        .aggregate([
            {
                $lookup: {
                    from: 'coursesections',
                    localField: 'courseSections',
                    foreignField: '_id',
                    as: 'courseSectionData'
                }
            }, {
                $lookup: // Join course offering data
                    {
                        from: 'courseofferings',
                        localField: 'courseSectionData.courseOffering',
                        foreignField: '_id',
                        as: 'courseOfferingData'
                    }
            }, {
                $lookup: // Join course data
                    {
                        from: 'courses',
                        localField: 'courseOfferingData.course',
                        foreignField: '_id',
                        as: 'courseData'
                    }
            }, {
                $match: {
                    $or: [ // Person is instructor or TA or student for course section.
                        {'courseSectionData.instructorsIds': ObjectID.createFromHexString(personId)},
                        {'courseSectionData.teachingAssistantsIds': ObjectID.createFromHexString(personId)},
                        {'courseSectionData.studentsIds': ObjectID.createFromHexString(personId)},
                    ]
                }
            },
        ])
        .then(blocks => res.send({blocks}));
});

export default router;
