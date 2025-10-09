"use client";
import { useState, useEffect } from "react";
import { getAllPosts, getAllAuthors, getAllCategories } from "@/lib/sanity";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    posts: [],
    authors: [],
    categories: [],
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const [posts, authors, categories] = await Promise.all([getAllPosts(), getAllAuthors(), getAllCategories()]);
    setStats({ posts, authors, categories });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Posts</h3>
          <p className="text-3xl font-bold">{stats.posts.length}</p>
          <Link href="/admin/posts" className="text-blue-500 text-sm hover:underline">
            Manage Posts →
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Authors</h3>
          <p className="text-3xl font-bold">{stats.authors.length}</p>
          <Link href="/admin/authors" className="text-blue-500 text-sm hover:underline">
            Manage Authors →
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Categories</h3>
          <p className="text-3xl font-bold">{stats.categories.length}</p>
          <Link href="/admin/categories" className="text-blue-500 text-sm hover:underline">
            Manage Categories →
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <Link href="/admin/posts/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            New Post
          </Link>
          <Link href="/admin/authors/new" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            New Author
          </Link>
          <Link href="/admin/categories/new" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
            New Category
          </Link>
        </div>
      </div>

      {/* Recent Posts */}
      <div>
        <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {stats.posts.slice(0, 5).map((post: any) => (
            <div key={post._id} className="p-4 border-b last:border-b-0 flex justify-between items-center">
              <div>
                <h3 className="font-medium">{post.title}</h3>
                <p className="text-sm text-gray-500">
                  By {post.author?.name} | {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              </div>
              <Link href={`/admin/posts/${post.slug.current}/edit`} className="text-blue-500 hover:underline">
                Edit
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
