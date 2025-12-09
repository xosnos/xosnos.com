import { NextResponse } from 'next/server';
import { listPublishedBlogs } from '@/data/blogs';

export async function GET() {
  const posts = listPublishedBlogs();
  return NextResponse.json({
    count: posts.length,
    posts,
  });
}


