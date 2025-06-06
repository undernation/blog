import { getPostByIdFromDB } from '@/lib/posts'
import type { Metadata } from 'next'
import PageClient from "./PageClient"
import type { PageProps } from '@/types/PageProps'



// ✅ generateMetadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostByIdFromDB(id);
  if (!post) return { title: "글을 찾을 수 없습니다." };
  return { title: post.title };
}

// TOC 추출 함수
/*
function getTocFromMarkdown(markdown: string) {
  return markdown
    .split('\n')
    .filter(line => /^#{1,6} /.test(line))
    .map(line => {
      const match = line.match(/^(#{1,6}) (.*)/);
      if (!match) return undefined;
      return {
        level: match[1].length,
        text: match[2],
        id: match[2].toLowerCase().replace(/\s+/g, '-'),
      };
    })
    .filter((item): item is { level: number; text: string; id: string } => !!item);
}
*/

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const post = await getPostByIdFromDB(id);
  if (!post) {
    return <div style={{ padding: 32, textAlign: 'center' }}>글을 찾을 수 없습니다.</div>;
  }
  // _id를 string으로 변환
  const plainPost = {
    ...post,
    _id: post._id?.toString() ?? "",
  };
  return <PageClient post={plainPost} />;
}
