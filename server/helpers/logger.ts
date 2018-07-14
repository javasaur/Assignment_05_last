import {CONFIG} from '../config';

export default class Logger {
    static async log(str) {
        switch(CONFIG.LOGGER.output) {
            case 'console':
                Logger.__console(str);
                break;
            default:
                Logger.__console(str);
        }
    }

    static async __console(str) {
        console.log(str);
    }
}