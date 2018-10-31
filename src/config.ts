
export class Config {

    //JWT Configuration parameters
    static privateKey: string = "37LvDSm4XvjYOh9Y";  //for after login controls
    static tokenExpiry: number = 30 * 1000 * 60; //time out about token

    //Mongo DB URL
    static mongoUrl: string = process.env.MONGO_URL || "mongodb://localhost/myapplocaldb";

    //Environment Specific Variables
    static local: { [key: string]: string; } = {
        frontEndUrl: "http://localhost:4200",
    };

    static dev: { [key: string]: string; } = {
        frontEndUrl: "https://dev.boxlin.com",
    };

    static test: { [key: string]: string; } = {
        frontEndUrl: "http://test.boxlin.com",
    };

    public static getVariable(name: string): string {

        switch (process.env.NODE_ENV) {
            case 'local':
                return Config.local[name];
            case 'dev':
                return Config.dev[name];
            case 'test':
                return Config.test[name];
            default: {
                return Config.local[name];
            }
        }
    }
}