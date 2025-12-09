import Link from 'next/link';
import { Calendar, Tag, BookOpenText } from 'lucide-react';
import { listPublishedBlogs } from '@/data/blogs';

export default function BlogsIndexPage() {
  const posts = listPublishedBlogs();

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-montserrat font-bold uppercase flex items-center justify-center gap-3 text-secondary">
            <BookOpenText className="w-8 h-8" />
            <span>Blog</span>
            <BookOpenText className="w-8 h-8" />
          </h1>
          <p className="text-gray-700 mt-4">
            Writing on engineering, career, and things I’m building.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center bg-primary rounded-lg p-10 border border-gray-200">
            <p className="text-gray-800 text-lg font-semibold">No posts yet.</p>
            <p className="text-gray-700 mt-3">Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white shadow-md rounded-lg border border-gray-100 p-6 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: '2-digit',
                      year: 'numeric',
                    })}
                  </span>
                  {post.readingTime && (
                    <>
                      <span className="mx-1 text-gray-300">•</span>
                      <span>{post.readingTime}</span>
                    </>
                  )}
                </div>
                <h2 className="text-2xl font-montserrat font-bold text-gray-900">{post.title}</h2>
                <p className="text-gray-700 leading-relaxed">{post.summary}</p>

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

                <div className="flex items-center gap-4 mt-auto">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="text-primary font-semibold hover:underline"
                  >
                    Read post
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

