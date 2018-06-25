import {v1} from 'uuid';

export function rethrow(err) {
    throw err;
}

export function genID() {
    return v1();
}

export function sendError(error, ...args) {
    const res = args[0];
    const status = args[1];
    res.status(status).send(error);
}