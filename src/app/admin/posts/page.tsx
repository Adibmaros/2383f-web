"use client";
import { useState, useEffect } from "react";
import { getAllPosts, client, urlFor } from "@/lib/sanity";
import Link from "next/link";
import { PlusCircle, Edit2, Trash2, Clock, User } from "lucide-react";

export default function PostsAdminPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const data = await getAllPosts();
    setPosts(data);
  };

  const handleDelete = async (postId: any) => {
    if (confirm("Are you sure you want to delete this post?")) {
      await client.delete(postId);
      loadPosts();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Posts</h1>
          <p className="mt-2 text-sm text-gray-700">Create, edit and manage your blog posts</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 
                   bg-blue-600 hover:bg-blue-700 text-white text-sm 
                   font-medium rounded-md shadow-sm transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          New Post
        </Link>
      </div>

      <div className="grid gap-6">
        {posts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-4">No posts found</p>
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center px-4 py-2 bg-blue-600 
                       hover:bg-blue-700 text-white text-sm font-medium rounded-md"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Create your first post
            </Link>
          </div>
        ) : (
          posts.map((post: any) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 
                       overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="sm:flex items-center p-6">
                {post.mainImage && (
                  <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                    <img src={urlFor(post.mainImage).width(120).height(80).url()} alt={post.title} className="w-full sm:w-[120px] h-[80px] object-cover rounded-md" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-gray-900 truncate">{post.title}</h2>
                  <div className="mt-1 flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author.name}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-shrink-0 gap-2">
                  <Link
                    href={`/admin/posts/${post.slug.current}/edit`}
                    className="inline-flex items-center px-3 py-2 border 
                             border-gray-300 rounded-md text-sm font-medium 
                             text-gray-700 bg-white hover:bg-gray-50 
                             transition-colors"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="inline-flex items-center px-3 py-2 border 
                             border-red-300 rounded-md text-sm font-medium 
                             text-red-700 bg-white hover:bg-red-50 
                             transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
