import { getPostBySlug } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import ShareButton from "@/components/ShareButton";

export default async function PostPage({ params }: { params: { slug: string } }) {
  try {
    const post = await getPostBySlug(params.slug);
    console.log("Post categories:", post?.categories); // Debug log

    if (!post) {
      return notFound();
    }

    // Calculate estimated reading time
    const wordsPerMinute = 200;
    const wordCount = post.body
      ?.map((block: any) => block?.children?.map((child: any) => child?.text || "").join("") || "")
      .join("")
      .split(" ").length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    return (
      <div className="min-h-screen bg-white">
        {/* Back to blog link */}
        <div className="container mx-auto px-4 py-4">
          <Link href="/blog" className="inline-flex items-center text-gray-600 hover:text-blue-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>

        <article className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header Section */}
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>

            <div className="flex items-center justify-center space-x-4 mb-8 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {readingTime} min read
              </div>
              <span>•</span>
              <time>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            {post.mainImage && (
              <div className="rounded-xl overflow-hidden shadow-xl">
                <img src={urlFor(post.mainImage).width(1200).url()} alt={post.title} className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover" />
              </div>
            )}
          </header>

          {/* Author Section */}
          <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl mb-12">
            <div className="flex items-center">
              {post.author?.image && <img src={urlFor(post.author.image).width(60).height(60).url()} alt={post.author?.name || "Author"} className="w-12 h-12 md:w-16 md:h-16 rounded-full mr-4 border-2 border-white shadow" />}
              <div>
                <p className="text-sm text-gray-600">Written by</p>
                {post.author?.slug?.current ? (
                  <Link href={`/author/${post.author.slug.current}`} className="font-medium text-gray-900 hover:text-blue-600">
                    {post.author.name || "Unknown Author"}
                  </Link>
                ) : (
                  <span className="font-medium text-gray-900">{post.author?.name || "Unknown Author"}</span>
                )}
              </div>
            </div>
            <ShareButton title={post.title} />
          </div>

          {/* Content */}
          <div className="prose prose-lg md:prose-xl max-w-none">
            <PortableText value={post.body} />
          </div>

          {/* Categories */}
          {Array.isArray(post.categories) && post.categories.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-bold mb-4">Posted in:</h3>
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category: any) => (
                  <Link
                    key={category._id}
                    href={`/category/${category.slug}`}
                    className="bg-gray-100 px-4 py-2 rounded-full text-sm
                             hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    return notFound();
  }
}
