function onTransaction(...fns) {
    return transaction => {
        fns.forEach(fn => fn(transaction));
    }
}

function stashId(name, stash) {
    return transaction => {
        stash[`${name}Id`] = getId(transaction, name);
    };
}

function unstashId(name, stash) {
    return transaction => {
        const idName = `${name}Id`;
        setUrlParam(transaction, idName, stash[idName]);
        setBodyParam(transaction, idName, stash[idName]);
    }
}

function setBodyParam(transaction, name, value) {
    if (transaction.request) {
        transaction.request.body = transaction.request.body.replace(`{${name}}`, value);
    }
}

function setUrlParam(transaction, name, value) {
    if (transaction.id) {
        transaction.id = transaction.id.replace(encodeURIComponent(`{${name}}`), value);
    }
    if (transaction.request) {
        const uri = transaction.request.uri.replace(encodeURIComponent(`{${name}}`), value);
        transaction.fullPath = transaction.request.uri = uri;
    }
}

function getId(transaction, name) {
    const body = JSON.parse(transaction.real.body);
    const obj = body[name];
    return obj ? obj._id : undefined;
}

module.exports = {onTransaction, stashId, unstashId, setBodyParam, setUrlParam, getId}
