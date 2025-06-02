import { getPostByIdFromDB } from "@/lib/posts";

interface PageProps {
  params: { id: string }
}

export default async function Page({ params }: PageProps) {
  const post = await getPostByIdFromDB(params.id);

  if (!post) {
    return <div style={{ padding: 32, textAlign: 'center' }}>글을 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: 32, border: '1px solid #ececec' }}>
      <h1 style={{ fontSize: '1.7rem', fontWeight: 'bold', marginBottom: 12 }}>{post.title}</h1>
      <div style={{ color: '#888', fontSize: '0.95rem', marginBottom: 18 }}>{post.date}</div>
      <div style={{ color: '#222', fontSize: '1.1rem', lineHeight: 1.7 }}>{post.content}</div>
    </div>
  );
}
