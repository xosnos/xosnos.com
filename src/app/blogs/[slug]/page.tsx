import { notFound } from 'next/navigation';
import { getBlogBySlug } from '@/data/blogs';
import { Calendar, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Link from 'next/link';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post || post.published === false) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl space-y-8">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <Link href="/blogs" className="text-primary font-semibold hover:underline">
            ← Back to blogs
          </Link>
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: '2-digit' })}</span>
            {post.readingTime && (
              <>
                <span className="mx-1 text-gray-300">•</span>
                <span>{post.readingTime}</span>
              </>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-montserrat font-bold text-gray-900 leading-tight">{post.title}</h1>
          <p className="text-lg text-gray-700 leading-relaxed">{post.summary}</p>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-xs font-semibold bg-primary text-gray-800 px-3 py-1 rounded-full border border-gray-200"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {post.heroImage && (
          <div className="w-full aspect-video overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-xs relative">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              className="object-cover"
              priority={false}
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none prose-headings:scroll-mt-24 prose-headings:font-montserrat prose-p:leading-relaxed prose-li:leading-relaxed prose-img:rounded-lg prose-img:border prose-img:border-gray-200 prose-img:shadow-sm">
          {post.content && (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </article>
  );
}

