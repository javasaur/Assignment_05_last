import {connection} from './mysql';
import * as util from "util";
const dbConnection = connection();

export const dbQuery = util.promisify(dbConnection.query.bind(dbConnection));

export function contains(arr, val) {
    return arr.indexOf(val) !== - 1;
}

export function escape(queryPart) {
    if(typeof queryPart === 'object') {
        for(let key in queryPart) {
            queryPart[key] = escape(queryPart[key]);
        }
        return;
    }

    return dbConnection.escape(queryPart);
}
