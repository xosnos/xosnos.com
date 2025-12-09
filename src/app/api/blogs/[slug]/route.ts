import { NextRequest, NextResponse } from 'next/server';
import { getBlogBySlug } from '@/data/blogs';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post || post.published === false) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}


