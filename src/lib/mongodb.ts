import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // 개발 환경에서는 핫리로드 시 클라이언트 중복 방지
  if (!(global as Record<string, any>)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as Record<string, any>)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as Record<string, any>)._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise; 