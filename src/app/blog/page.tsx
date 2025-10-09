import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Posts",
  description: "Read our latest blog posts",
};

export const revalidate = 60; // revalidate content every 60 seconds

export default async function BlogPage() {
  try {
    const [postsRaw, categoriesRaw] = await Promise.all([getAllPosts(), getAllCategories()]);
    const posts = Array.isArray(postsRaw) ? postsRaw : [];
    const categories = Array.isArray(categoriesRaw) ? categoriesRaw : [];

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Posts</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore our latest articles and insights about technology, programming, and more.</p>
        </div>

        {/* Categories Navigation */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Categories</h2>
          <nav className="overflow-x-auto">
            <ul className="flex flex-nowrap space-x-2 md:space-x-4 pb-2">
              {categories.map((category: any) => (
                <li key={category._id} className="flex-none">
                  <Link
                    href={`/category/${category.slug}`}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full 
                             text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 
                             transition-colors duration-200"
                  >
                    {category.title}
                    <span className="ml-2 text-xs text-gray-500">({category.postCount || 0})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Blog Posts Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Latest Posts</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-600">No posts found.</p>
              </div>
            ) : (
              posts.map((post: any) => (
                <article
                  key={post._id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden 
                           hover:shadow-lg transition-shadow duration-300"
                >
                  {post.mainImage && (
                    <div className="relative h-48 sm:h-56 lg:h-64">
                      <img src={urlFor(post.mainImage).width(600).url()} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-6">
                    <Link href={`/post/${post.slug?.current}`}>
                      <h3
                        className="text-xl font-bold text-gray-900 mb-2 
                                 hover:text-blue-600 transition-colors"
                      >
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {post.author?.image && <img src={urlFor(post.author.image).width(40).height(40).url()} alt={post.author.name} className="w-8 h-8 rounded-full mr-2 object-cover" />}
                        <div>
                          <Link href={`/author/${post.author?.slug?.current}`} className="text-sm font-medium text-gray-900 hover:text-blue-600">
                            {post.author?.name ?? "Unknown"}
                          </Link>
                          <p className="text-xs text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    );
  } catch (err: any) {
    console.error("Error fetching blog data:", err);
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Terjadi kesalahan saat memuat blog</h2>
        <p className="mb-4 text-gray-600">Periksa konfigurasi Sanity (NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET) dan lihat log server.</p>
        <pre className="text-sm p-4 bg-gray-100 rounded overflow-auto">{String(err?.message ?? err)}</pre>
        <p className="mt-4">
          <Link href="/" className="text-blue-500 hover:text-blue-700">
            Kembali ke beranda
          </Link>
        </p>
      </div>
    );
  }
}
