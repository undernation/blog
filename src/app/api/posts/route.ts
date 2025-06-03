import { NextRequest, NextResponse } from "next/server";
import { addPostToDB } from "@/lib/posts";

export async function POST(req: NextRequest) {
  const { title, content, author } = await req.json();
  if (!title || !content) {
    return NextResponse.json({ error: "제목과 내용을 입력하세요." }, { status: 400 });
  }
  const date = new Date().toISOString().slice(0, 10);
  const result = await addPostToDB({ title, content, date, author });
  return NextResponse.json({ ok: true, id: result.insertedId }, { status: 201 });
} 