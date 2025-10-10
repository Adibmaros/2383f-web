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
    <div className="container mx-auto p-4 md:p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100 transition-colors">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div
          className="bg-white dark:bg-gray-700/30 p-6 rounded-xl shadow-sm hover:shadow-md 
                     transition-all duration-300 backdrop-blur-sm border border-gray-100 dark:border-gray-700/30"
        >
          <h3 className="text-gray-500 dark:text-gray-300 text-sm font-medium">Total Posts</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 my-2">{stats.posts.length}</p>
          <Link
            href="/admin/posts"
            className="text-blue-500 dark:text-blue-300 text-sm hover:text-blue-600 
                                           dark:hover:text-blue-200 transition-colors inline-flex items-center"
          >
            Manage Posts <span className="ml-1">→</span>
          </Link>
        </div>
        <div
          className="bg-white dark:bg-gray-700/30 p-6 rounded-xl shadow-sm hover:shadow-md 
                     transition-all duration-300 backdrop-blur-sm border border-gray-100 dark:border-gray-700/30"
        >
          <h3 className="text-gray-500 dark:text-gray-300 text-sm font-medium">Authors</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 my-2">{stats.authors.length}</p>
          <Link
            href="/admin/authors"
            className="text-blue-500 dark:text-blue-300 text-sm hover:text-blue-600 
                                             dark:hover:text-blue-200 transition-colors inline-flex items-center"
          >
            Manage Authors <span className="ml-1">→</span>
          </Link>
        </div>
        <div
          className="bg-white dark:bg-gray-700/30 p-6 rounded-xl shadow-sm hover:shadow-md 
                     transition-all duration-300 backdrop-blur-sm border border-gray-100 dark:border-gray-700/30"
        >
          <h3 className="text-gray-500 dark:text-gray-300 text-sm font-medium">Categories</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 my-2">{stats.categories.length}</p>
          <Link
            href="/admin/categories"
            className="text-blue-500 dark:text-blue-300 text-sm hover:text-blue-600 
                                               dark:hover:text-blue-200 transition-colors inline-flex items-center"
          >
            Manage Categories <span className="ml-1">→</span>
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Quick Actions</h2>
        <div className="flex flex-wrap gap-3 md:gap-4">
          <Link
            href="/admin/posts/new"
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 
                         text-white px-4 py-2 rounded-lg transition-colors"
          >
            New Post
          </Link>
          <Link
            href="/admin/authors/new"
            className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 
                         text-white px-4 py-2 rounded-lg transition-colors"
          >
            New Author
          </Link>
          <Link
            href="/admin/categories/new"
            className="bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 
                         text-white px-4 py-2 rounded-lg transition-colors"
          >
            New Category
          </Link>
        </div>
      </div>

      {/* Recent Posts */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Recent Posts</h2>
        <div
          className="bg-white dark:bg-gray-700/30 rounded-xl shadow-sm overflow-hidden 
                     border border-gray-100 dark:border-gray-700/30 backdrop-blur-sm"
        >
          {stats.posts.slice(0, 5).map((post: any) => (
            <div
              key={post._id}
              className="p-4 border-b border-gray-100 dark:border-gray-700/30 last:border-b-0 
                          flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/40 
                          transition-colors"
            >
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">{post.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  By {post.author?.name} | {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              </div>
              <Link
                href={`/admin/posts/${post.slug.current}/edit`}
                className="text-blue-500 dark:text-blue-300 hover:text-blue-600 
                             dark:hover:text-blue-200 transition-colors"
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
