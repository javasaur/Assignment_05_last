import {execAsTransaction} from "./helpers/db";
import * as DAL from "./lib/dal";

const q1 = `INSERT INTO users (\`name\`, \`age\`, \`password\`) VALUES ('Test1', '25', '1');`;
const q2 = `INSERT INTO usersfadsf (\`name\`, \`age\`, \`password\`) VALUES ('Test2', '25', '1');`;

(async () => {
    await DAL.Messages.addUnreadMessagesCounter('1', '2').execute();
})()

