export class Logger {
    static CONSOLE_OUTPUT = true;
    constructor(){}

    static log(message: any) {
        if(Logger.CONSOLE_OUTPUT) {
            console.log(message);
        }
    }
}