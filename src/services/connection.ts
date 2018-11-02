const MongoClient = require('mongodb').MongoClient;
import {injectable} from "inversify";
import "reflect-metadata";
import {Config} from "../config";

var assert = require('assert');

export interface IConnection {
    open();

    close();
}

// Create a class to manage the data manipulation.
@injectable()
export class Connection implements IConnection {
    static url: string = Config.mongoUrl;
    public dbConnection: any = null;

    constructor() {
        this.open();
    }

    // Open the MongoDB connection.
    public open() {
        if (this.dbConnection == null) {

            // Connect using MongoClient
            MongoClient.connect(Connection.url, (err, db) => {
                assert.equal(null, err);
                console.log("Connected correctly to MongoDB server.");
                this.dbConnection = db;
            });
        }
    }

    // Close the existing connection.
    public close() {
        if (this.dbConnection) {
            this.dbConnection.close();
            this.dbConnection = null;
        }
    }
}