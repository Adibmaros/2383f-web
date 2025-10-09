import { getCategoryBySlug, getPostsByCategory } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }: any) {
  try {
    const [category, posts] = await Promise.all([getCategoryBySlug(params.slug), getPostsByCategory(params.slug)]);

    if (!category) {
      return notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{category.title}</h1>
          {category.description && <p className="text-gray-600 text-lg mb-4">{category.description}</p>}
          <div className="text-sm text-gray-500">
            {category.postCount} {category.postCount === 1 ? "post" : "posts"} in this category
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-12 px-4">
            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No posts found in this category</h2>
              <p className="text-gray-600 mb-4">Check back later for new content or explore other categories.</p>
              <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                ← Back to all posts
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <article key={post._id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {post.mainImage && (
                  <div className="relative h-48 sm:h-56">
                    <img src={urlFor(post.mainImage).width(600).url()} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-6">
                  <Link href={post.slug ? `/post/${post.slug}` : "#"}>
                    <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h2>
                  </Link>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center">
                      {post.author?.image && <img src={urlFor(post.author.image).width(40).height(40).url()} alt={post.author.name || "Author"} className="w-8 h-8 rounded-full mr-3 object-cover" />}
                      <div>
                        <Link href={post.author?.slug ? `/author/${post.author.slug}` : "#"} className="text-sm font-medium text-gray-900 hover:text-blue-600">
                          {post.author?.name ?? "Unknown"}
                        </Link>
                        <p className="text-xs text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error loading category:", error);
    return notFound();
  }
}
