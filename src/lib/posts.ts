import clientPromise from "./mongodb";
import { ObjectId, InsertOneResult, Document } from "mongodb";

// 타입 정의
export type Post = {
  _id?: ObjectId;
  title: string;
  content: string;
  date: string;
  author: string;
};

// 모든 글 반환
export async function getPostsFromDB(): Promise<Post[]> {
  const client = await clientPromise;
  const db = client.db("blog");
  const posts = await db.collection("posts").find({}).sort({ date: -1 }).toArray();
  // MongoDB에서 불러온 데이터를 Post 타입으로 변환
  return posts.map((post: Record<string, unknown>) => ({
    _id: post._id as ObjectId,
    title: post.title as string,
    content: post.content as string,
    date: post.date as string,
    author: post.author as string,
  }));
}

// id로 글 하나 반환
export async function getPostByIdFromDB(id: string): Promise<Post | null> {
  const client = await clientPromise;
  const db = client.db("blog");
  try {
    const post = await db.collection("posts").findOne({ _id: new ObjectId(id) });
    if (!post) return null;
    return {
      _id: post._id,
      title: post.title,
      content: post.content,
      date: post.date,
      author: post.author,
    };
  } catch {
    return null;
  }
}

export async function addPostToDB(post: Omit<Post, "_id">): Promise<InsertOneResult<Document>> {
  const client = await clientPromise;
  const db = client.db("blog");
  const result = await db.collection("posts").insertOne(post);
  return result;
}
