import Logger from "./logger";

export function contains(arr, val) {
    return arr.indexOf(val) !== - 1;
}

export function logAndThrow(toLog, toThrowMessage) {
    Logger.log(JSON.stringify(toLog));
    throw new Error(toThrowMessage);
}

export function _throw(e) {
    throw e;
}

