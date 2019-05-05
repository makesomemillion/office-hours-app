import * as express from 'express';

import blocks from './blocks';
import meetings from './meetings';
import comments from './comments';
import notes from './notes';
import people from './people';

const router = express.Router();

router.use('/blocks', blocks);
router.use('/meetings', meetings);
router.use('/comments', comments);
router.use('/notes', notes);
router.use('/people', people);

export default router;
