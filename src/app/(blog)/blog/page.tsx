import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";

export const revalidate = 60; // revalidate content every 60 seconds

export default async function BlogPage() {
  try {
    const [postsRaw, categoriesRaw] = await Promise.all([getAllPosts(), getAllCategories()]);
    const posts = Array.isArray(postsRaw) ? postsRaw : [];
    const categories = Array.isArray(categoriesRaw) ? categoriesRaw : [];

    return (
      <div className="container mx-auto px-4 py-8 min-h-screen ">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Blog Posts</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">Explore our latest articles and insights about technology, programming, and more.</p>
        </div>

        {/* Categories Navigation */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Categories</h2>
          <nav className="overflow-x-auto scrollbar-hide">
            <ul className="flex flex-nowrap space-x-3 pb-2">
              {categories.map((category: any) => (
                <li key={category._id} className="flex-none">
                  <Link
                    href={`/category/${category.slug}`}
                    className="inline-block px-4 py-2 bg-gray-50 dark:bg-gray-800/40
                             border border-gray-200 dark:border-gray-700/40
                             rounded-full text-sm text-gray-700 dark:text-gray-300
                             hover:bg-blue-50 dark:hover:bg-blue-500/10
                             hover:text-blue-600 dark:hover:text-blue-400
                             hover:border-blue-200 dark:hover:border-blue-500/30
                             transition-all duration-200
                             shadow-sm hover:shadow-md backdrop-blur-sm"
                  >
                    {category.title}
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-500">({category.postCount || 0})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Blog Posts Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Latest Posts</h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {posts.length === 0 ? (
              <div
                className="col-span-full text-center py-12 bg-gray-50 dark:bg-gray-800/30 
                            rounded-xl border border-gray-200 dark:border-gray-700/30
                            backdrop-blur-sm"
              >
                <p className="text-gray-600 dark:text-gray-400">No posts found.</p>
              </div>
            ) : (
              posts.map((post: any) => (
                <article
                  key={post._id}
                  className="bg-white dark:bg-gray-800/40
                           border border-gray-200 dark:border-gray-700/50
                           rounded-xl overflow-hidden 
                           hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-blue-500/10
                           transition-all duration-300
                           group hover:border-gray-300 dark:hover:border-gray-600/70
                           backdrop-blur-sm"
                >
                  {post.mainImage && (
                    <div className="relative overflow-hidden h-48 bg-gray-100 dark:bg-gray-800/30">
                      <img
                        src={urlFor(post.mainImage).width(600).url()}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 
                                 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <Link href={`/post/${typeof post.slug === "string" ? post.slug : post.slug?.current}`}>
                      <h2
                        className="text-xl font-bold text-gray-900 dark:text-white
                                   group-hover:text-blue-600 dark:group-hover:text-blue-400
                                   transition-colors line-clamp-2 mb-3"
                      >
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-400 mt-3 line-clamp-3 text-sm leading-relaxed">{post.excerpt}</p>
                    <div className="mt-4 flex items-center">
                      {post.author?.image && (
                        <div
                          className="relative w-10 h-10 rounded-full overflow-hidden 
                                    border-2 border-gray-200 dark:border-gray-600"
                        >
                          <img src={urlFor(post.author.image).width(40).height(40).url()} alt={post.author.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <Link
                        href={`/author/${typeof post.author?.slug === "string" ? post.author.slug : post.author?.slug?.current}`}
                        className="ml-2 text-blue-600 dark:text-blue-400 
                                 hover:text-blue-700 dark:hover:text-blue-300
                                 font-medium transition-colors text-sm"
                      >
                        {post.author?.name ?? "Unknown"}
                      </Link>
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
    return (
      <div className="container mx-auto px-4 py-12 text-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Terjadi kesalahan saat memuat blog</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">Periksa konfigurasi Sanity dan lihat log server.</p>
        <pre
          className="text-sm p-4 bg-gray-50 dark:bg-gray-800/40
                     rounded-xl overflow-auto text-left max-w-2xl mx-auto
                     text-gray-800 dark:text-gray-200 
                     border border-gray-200 dark:border-gray-700/40
                     backdrop-blur-sm"
        >
          {String(err?.message ?? err)}
        </pre>
        <p className="mt-4">
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 
                     hover:text-blue-800 dark:hover:text-blue-300 
                     transition-colors font-medium"
          >
            Kembali ke beranda
          </Link>
        </p>
      </div>
    );
  }
}
