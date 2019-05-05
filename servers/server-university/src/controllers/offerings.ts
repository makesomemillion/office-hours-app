import * as express from 'express';
import CourseOffering from '../models/course-offering';
import CourseSection from '../models/course-section';
import Course from '../models/course';
import * as mongoose from 'mongoose';

const router = express.Router();

const CourseModel = new Course().getModelForClass(Course, {schemaOptions: {versionKey: false}});
const CourseOfferingModel = new CourseOffering().getModelForClass(CourseOffering, {schemaOptions: {versionKey: false}});
const CourseSectionModel = new CourseSection().getModelForClass(CourseSection, {schemaOptions: {versionKey: false}});

router.get('/:offeringId', (req, res) => {
  const offeringId = req.params.offeringId;

  let offering;
  CourseOfferingModel
      .findById(offeringId)
      .then(o => offering = o)
      .then(() => CourseModel.findById(offering.course))
      .catch(() => res.send({courseOffering: null}))
      .then(course => res.send({course, courseOffering: offering}));
});

router.delete('/:offeringId', (req, res) => {
  const offeringId = req.params.offeringId;

  CourseOfferingModel
      .findByIdAndDelete(offeringId)
      .then(offering => res.send({courseOffering: offering}));
});

router.put('/:offeringId', (req, res) => {
  const offeringId = req.params.offeringId;
  const offering = req.body.courseOffering;
  delete offering._id;

  CourseOfferingModel
      .findByIdAndUpdate(offeringId, offering, {new: true})
      .then(insertedOffering => res.send({courseOffering: insertedOffering}));
});

router.get('/:offeringId/sections', (req, res) => {
  const offeringId = req.params.offeringId;

  CourseSectionModel
      .find({courseOffering: offeringId})
      .then(sections => res.send({courseSections: sections}));
});

router.post('/:offeringId/sections', (req, res) => {
  const offeringId = req.params.offeringId;
  const section = req.body.courseSection;
  section._id = mongoose.Types.ObjectId();
  section.courseOffering = offeringId;

  const sectionModel = new CourseSectionModel(section);
  sectionModel
      .save()
      .then(insertedSection => res.status(201).send({courseSection: insertedSection}));
});

export default router;
