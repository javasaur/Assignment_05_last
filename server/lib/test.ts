import * as DAL from "./dal";
import * as services from "../services";

(async function() {

    try {
        await services.Messages.addMessageToDialogue('1_5', {authorId: '1', content: 'hello there'});

    } catch (err) {
        console.log("========USER SEES THIS============");
        console.log(err.message);
        console.log("==================================");
    }


    // console.log(users);
    // console.log("==================================");


})();



