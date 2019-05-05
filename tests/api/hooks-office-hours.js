const hooks = require('hooks');
const {onTransaction, stashId, unstashId} = require('./hooks-utils');

const stash = {};

hooks.beforeEach(
    onTransaction(
        unstashId('block', stash),
        unstashId('meeting', stash),
        unstashId('comment', stash),
        unstashId('note', stash),
    )
);

hooks.after('Blocks > Block Collection > Add a block',
    onTransaction(stashId('block', stash))
);

hooks.after('Meetings > Meeting Collection > Add a meeting',
    onTransaction(stashId('meeting', stash))
);

hooks.after('Comments > Comment Collection for Meeting > Add a comment',
    onTransaction(stashId('comment', stash))
);

hooks.after('Notes > Note Collection for Meeting > Add a note',
    onTransaction(stashId('note', stash))
);
