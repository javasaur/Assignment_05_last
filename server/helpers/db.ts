import {connection} from '../lib/db';
import * as util from "util";

const dbConnection = connection();

export async function execAsTransaction(...queries) {
    let query = ``;
    query += `START TRANSACTION;`;
    queries.forEach(q => query += q);
    query += `COMMIT;`;
    return dbQuery(query);
}

export const dbQuery = util.promisify(dbConnection.query.bind(dbConnection));

export function escape(queryPart) {
    if(typeof queryPart === 'object') {
        for(let key in queryPart) {
            queryPart[key] = escape(queryPart[key]);
        }
        return;
    }

    return dbConnection.escape(queryPart);
}

