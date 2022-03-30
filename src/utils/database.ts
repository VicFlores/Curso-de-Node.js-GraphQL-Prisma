import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const url: string = process.env.MONGODB as string;
const client = new MongoClient(url);

const database = async () => {
  await client.connect();
  const db = client.db(process.env.DATABASE as string);
  return db;
};
export default database;
