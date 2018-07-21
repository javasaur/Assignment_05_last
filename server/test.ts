import {escape, execAsTransaction} from "./helpers/db";
import * as DAL from "./lib/dal";

(async () => {
   const res = await DAL.Users.getUserByProp('name','VES', 'no-password').execute();
   console.log(!!res);
})()

