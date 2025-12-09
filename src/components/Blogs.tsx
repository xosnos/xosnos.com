import { Calendar, Tag, BookOpenText } from 'lucide-react';
import { listPublishedBlogs } from '@/data/blogs';
import Link from 'next/link';

const Blogs = async () => {
  const posts = listPublishedBlogs();

  return (
    <section id="blogs" className="py-20 bg-primary text-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-montserrat font-bold uppercase flex items-center justify-center gap-4 mb-6 text-secondary">
            <BookOpenText className="w-8 h-8" />
            <span>Blog</span>
            <BookOpenText className="w-8 h-8" />
          </h2>
          <div className="flex items-center justify-center mb-8">
            <div className="h-1 w-20 bg-secondary"></div>
            <div className="mx-4">
              <div className="w-4 h-4 bg-secondary"></div>
            </div>
            <div className="h-1 w-20 bg-secondary"></div>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="max-w-3xl mx-auto text-center bg-primary rounded-lg p-10 border border-gray-200">
            <p className="text-gray-800 text-lg font-semibold">No posts yet.</p>
            <p className="text-gray-700 mt-3">
              Add posts by editing <code className="bg-white px-2 py-1 rounded border">src/data/blogs.ts</code>.
              API available at <code className="bg-white px-2 py-1 rounded border">/api/blogs</code>.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white shadow-md rounded-lg border border-gray-100 p-6 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  {post.readingTime && (
                    <>
                      <span className="mx-1 text-gray-300">•</span>
                      <span>{post.readingTime}</span>
                    </>
                  )}
                </div>
                <h3 className="text-2xl font-montserrat font-bold text-gray-900">{post.title}</h3>
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
                  {post.canonicalUrl ? (
                    <a
                      href={post.canonicalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-semibold hover:underline"
                    >
                      Read post
                    </a>
                  ) : (
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="text-primary font-semibold hover:underline"
                    >
                      Read post
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;

