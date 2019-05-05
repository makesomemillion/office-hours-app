import * as express from 'express';

import people from './people';
import courses from './courses';
import offerings from './offerings';
import sections from './sections';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello world!'
  });
});

// Add all sub-routes.

router.use('/people', people);
router.use('/courses', courses);
router.use('/courses/:courseId/offerings', offerings);
router.use('/courses/:courseId/offerings/:offeringId/sections', sections);

export default router;
