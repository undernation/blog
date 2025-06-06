import PostForm from "@/components/PostForm";
import type { PageProps } from '@/types/PageProps'



export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <div>
      <h1>글 수정</h1>
      <PostForm postId={id} />
    </div>
  );
}