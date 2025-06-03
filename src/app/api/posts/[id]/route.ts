import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const client = await clientPromise;
  const db = client.db("blog");
  const result = await db.collection("posts").deleteOne({ _id: new ObjectId(params.id) });
  if (result.deletedCount === 1) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "삭제 실패" }, { status: 400 });
} 