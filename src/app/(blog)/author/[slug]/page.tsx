import { getAuthorBySlug, getPostsByAuthor } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

export default async function AuthorPage({ params }: any) {
  try {
    const [author, posts] = await Promise.all([getAuthorBySlug(params.slug), getPostsByAuthor(params.slug)]);

    if (!author) {
      return notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="mb-12 text-center">
          {author.image && (
            <div className="relative w-32 h-32 mx-auto mb-6 group">
              <img
                src={urlFor(author.image).width(150).height(150).url()}
                alt={author.name}
                className="w-full h-full rounded-full object-cover 
                         border-4 border-white dark:border-gray-700/50 
                         shadow-lg transition-transform duration-300
                         group-hover:scale-105"
              />
            </div>
          )}
          <h1
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 
                       dark:text-gray-100 transition-colors"
          >
            {author.name}
          </h1>
          <div
            className="prose dark:prose-invert max-w-2xl mx-auto 
                       text-gray-700 dark:text-gray-200 px-4 transition-colors"
          >
            <PortableText value={author.bio} />
          </div>
        </div>

        <h2
          className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 
                     transition-colors px-2"
        >
          Articles by {author.name}
        </h2>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post: any) => (
            <article
              key={post._id}
              className="border border-gray-200 dark:border-gray-700/30 rounded-xl 
                       overflow-hidden bg-white dark:bg-gray-700/30 
                       hover:shadow-xl transition-all duration-300 group
                       backdrop-blur-sm"
            >
              {post.mainImage && (
                <div className="relative overflow-hidden h-48">
                  <img
                    src={urlFor(post.mainImage).width(600).url()}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform 
                             duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5">
                <Link href={`/post/${post.slug?.current}`}>
                  <h3
                    className="text-xl font-bold text-gray-900 dark:text-gray-100 
                               group-hover:text-blue-600 dark:group-hover:text-blue-300 
                               transition-colors line-clamp-2"
                  >
                    {post.title}
                  </h3>
                </Link>
                <p
                  className="text-gray-600 dark:text-gray-300 mt-3 
                          line-clamp-3 text-sm leading-relaxed"
                >
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in author page:", error);
    return notFound();
  }
}
