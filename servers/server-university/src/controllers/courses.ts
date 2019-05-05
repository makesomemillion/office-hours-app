import * as express from 'express';
import Course from '../models/course';
import * as mongoose from 'mongoose';
import CourseOffering from '../models/course-offering';

const router = express.Router();

const CourseModel = new Course().getModelForClass(Course, {schemaOptions: {versionKey: false}});
const CourseOfferingModel = new CourseOffering().getModelForClass(CourseOffering, {schemaOptions: {versionKey: false}});

router.get('/', (req, res) => {
  const filter = req.query.filter;

  CourseModel.find({}, (err, courses) => {
    res.send({courses});
  });
});

router.post('/', (req, res) => {
  const course = req.body.course;

  const courseModel = new CourseModel(course);

  courseModel
      .save()
      .then(insertedCourse => res.status(201).send({course: insertedCourse}));
});

router.get('/:courseId', (req, res) => {
  const courseId = req.params.courseId;

  CourseModel
      .findById(courseId)
      .then(course => res.send({course}));
});

router.delete('/:courseId', (req, res) => {
  const courseId = req.params.courseId;

  CourseModel
      .findByIdAndDelete(courseId)
      .then(course => res.send({course}));
});

router.put('/:courseId', (req, res) => {
  const courseId = req.params.courseId;
  const course = req.body.course;
  delete course._id;

  CourseModel
      .findByIdAndUpdate(courseId, course, {new: true})
      .then(updatedCourse => res.send({course: updatedCourse}));
});

router.get('/:courseId/offerings', (req, res) => {
  const courseId = req.params.courseId;

  CourseOfferingModel
      .find({course: courseId})
      .then(courseOfferings => res.send({courseOfferings}));
});

router.post('/:courseId/offerings', (req, res) => {
  const courseId = req.params.courseId;
  const offering = req.body.courseOffering;
  offering._id = mongoose.Types.ObjectId();
  offering.course = courseId;

  const offeringModel = new CourseOfferingModel(offering);
  offeringModel
      .save()
      .then(insertedOffering => res.status(201).send({courseOffering: insertedOffering}));
});

export default router;
