import PostForm from "@/components/PostForm";

export default function EditPostPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '32px 0 24px 0' }}>글 수정</h1>
      <PostForm postId={params.id} />
    </div>
  );
} 