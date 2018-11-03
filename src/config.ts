
export class Config {

    //application port number
    static portNumber: any = process.env.PORT || 3001; //time out about token

    //JWT Configuration parameters
    static privateKey: string = process.env.JWT_SECRET_KEY || "37LvDSm4XvjYOh9Y";  //for after login controls
    static tokenExpiry: number = 30 * 1000 * 60; //time out about token

    //Mongo DB URL
    static mongoUrl: string = process.env.MONGO_URL || "mongodb://localhost/express_app_db";

}