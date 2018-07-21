import {connection} from '../lib/db';
import * as util from "util";

const dbConnection = connection();

export const DEFAULT_SQL_ERROR = `DB request failed, try later!`;

export function transaction() {
    let query = `START TRANSACTION;`;

    function append(str) {
        query += str;
    }

    function build() {
        query += `COMMIT;`;
    }

    async function buildAndExecute() {
        build();
        return execute();
    }

    async function execute() {
        return dbQuery(query);
    }

    return {
        append,
        build,
        buildAndExecute,
        execute,
        query
    }
}

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



