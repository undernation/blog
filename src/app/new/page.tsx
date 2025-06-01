import PostForm from "@/components/PostForm";

export default function NewPostPage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '32px 0 24px 0' }}>새 글 작성</h1>
      <PostForm />
    </div>
  );
}
