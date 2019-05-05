import * as express from 'express';
import CourseSection from '../models/course-section';

const router = express.Router();
const CourseSectionModel = new CourseSection().getModelForClass(CourseSection, {schemaOptions: {versionKey: false}});

router.get('/:sectionId', (req, res) => {
  const sectionId = req.params.sectionId;

  CourseSectionModel
      .findById(sectionId)
      .then(section => res.send({courseSection: section}));
});

router.put('/:sectionId', (req, res) => {
  const sectionId = req.params.sectionId;
  const section = req.body.courseSection;
  delete section._id;

  CourseSectionModel
      .findByIdAndUpdate(sectionId, section, {new: true})
      .then(insertedSection => res.send({courseSection: insertedSection}));
});

router.delete('/:sectionId', (req, res) => {
  const sectionId = req.params.sectionId;

  CourseSectionModel
      .findByIdAndDelete(sectionId)
      .then(section => res.send({courseSection: section}));
});

export default router;
