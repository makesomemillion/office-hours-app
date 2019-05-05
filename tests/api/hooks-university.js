const hooks = require('hooks');
const {onTransaction, stashId, unstashId} = require('./hooks-utils');

const stash = {};

hooks.beforeEach(
    onTransaction(
        unstashId('course', stash),
        unstashId('courseOffering', stash),
        unstashId('courseSections', stash),
        unstashId('person', stash),
    )
);

hooks.after('Courses > Course Collection > Add a course',
    onTransaction(stashId('course', stash))
);

hooks.after('Offerings > Offering Collection > Add an offering',
    onTransaction(stashId('courseOffering', stash))
);

hooks.after('Sections > Section Collection > Add a section',
    onTransaction(stashId('courseSections', stash))
);

hooks.after('People > Person Collection > Add a person',
    onTransaction(stashId('person', stash))
);
