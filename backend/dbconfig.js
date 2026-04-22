import { MongoClient } from "mongodb";
const  url="mongodb://localhost:27017";
const dbname="node-project";
export const collectionname="todo";

const client = new MongoClient(url);    
export const connection=async()=>{
    const connect=await client.connect();
    const db=await connect.db(dbname);
    return db;
}