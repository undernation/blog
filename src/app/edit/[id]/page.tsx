import PostForm from "@/components/PostForm";

export default function EditPostPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>글 수정</h1>
      <PostForm postId={params.id} />
    </div>
  );
}