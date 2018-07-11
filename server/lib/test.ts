import * as DAL from "./dal";
import * as services from "../services";

(async function() {

    try {
        console.log(await DAL.Messages.getUnreadMessagesCount('2', '1'));

    } catch (err) {
        console.log("========USER SEES THIS============");
        console.log(err.message);
        console.log("==================================");
    }


    // console.log(users);
    // console.log("==================================");


})();



