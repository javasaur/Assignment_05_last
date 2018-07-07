import * as DAL from "./dal";

(async function() {

    try {
        console.log(await DAL.Talks.hasSubtalks('1'));

    } catch (err) {
        console.log("========USER SEES THIS============");
        console.log(err.message);
        console.log("==================================");
    }


    // console.log(users);
    // console.log("==================================");


})();



