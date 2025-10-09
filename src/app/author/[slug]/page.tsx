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
      <div className="container mx-auto px-4 py-8 coba">
        <div className="mb-12 text-center">
          {author.image && <img src={urlFor(author.image).width(150).height(150).url()} alt={author.name} className="w-32 h-32 rounded-full mx-auto mb-4" />}
          <h1 className="text-3xl font-bold mb-2">{author.name}</h1>
          <div className="prose max-w-2xl mx-auto text-gray-600">
            <PortableText value={author.bio} />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Articles by {author.name}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <article key={post._id} className="border rounded-lg overflow-hidden">
              {post.mainImage && <img src={urlFor(post.mainImage).width(600).url()} alt={post.title} className="w-full h-48 object-cover" />}
              <div className="p-4">
                <Link href={`/post/${post.slug?.current}`}>
                  <h3 className="text-xl font-bold hover:text-blue-500">{post.title}</h3>
                </Link>
                <p className="text-gray-600 mt-2">{post.excerpt}</p>
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
