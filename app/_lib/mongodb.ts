import { Db, MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.NEXT_ATLAS_URI;

let mongoClient: MongoClient | null = null;
let database: Db | null = null;

if (!process.env.NEXT_ATLAS_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

export async function connectToMongoDB(): Promise<{ mongoClient: MongoClient | null, database: Db | null }> {
  try {
    if (mongoClient && database) {
      return { mongoClient, database };
    }
    if (process.env.NODE_ENV === "development") {
      if (!global._mongoClient) {
        // stores database connection in a global state so that
        // a new connection is not initiated whenever we hot-reload
        // this prevents us from spamming our own server during dev.
        mongoClient = await new MongoClient(uri!).connect();
        global._mongoClient = mongoClient;
      } else {
        mongoClient = global._mongoClient;
      }
    } else {
      mongoClient = await new MongoClient(uri!).connect();
    }
    database = await mongoClient!.db(process.env.NEXT_ATLAS_DATABASE);
    if(!database) throw Error("Something went wrong while trying to connect to MongoDB");
    return { mongoClient, database };
  } catch (e) {
    console.error(e);
    return { mongoClient: null, database: null };
  }
}
