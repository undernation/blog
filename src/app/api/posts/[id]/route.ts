import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(request: Request, context: { params: { id: string } }) {
  const { params } = context;
  const client = await clientPromise;
  const db = client.db("blog");
  const result = await db.collection("posts").deleteOne({ _id: new ObjectId(params.id) });
  if (result.deletedCount === 1) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "삭제 실패" }, { status: 400 });
}

export async function PUT(request: Request, context: { params: { id: string } }) {
  const { params } = context;
  const client = await clientPromise;
  const db = client.db("blog");
  const { title, content } = await request.json();
  const result = await db.collection("posts").updateOne(
    { _id: new ObjectId(params.id) },
    { $set: { title, content } }
  );
  if (result.modifiedCount === 1) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "수정 실패" }, { status: 400 });
}

export async function GET(request: Request, context: { params: { id: string } }) {
  const { params } = context;
  const client = await clientPromise;
  const db = client.db("blog");
  const post = await db.collection("posts").findOne({ _id: new ObjectId(params.id) });
  if (!post) {
    return NextResponse.json({ error: "글을 찾을 수 없습니다." }, { status: 404 });
  }
  return NextResponse.json({
    title: post.title,
    content: post.content,
    date: post.date,
    author: post.author,
  });
} 