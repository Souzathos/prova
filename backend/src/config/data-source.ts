import { DataSource } from "typeorm";
import * as dotenv from 'dotenv'
import { User } from "../models/User";
import { Guest } from "../models/Guest";
import { TableConfig } from "../models/TableConfig";
dotenv.config()
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Guest, TableConfig],
    synchronize: true,
    logging: true
})