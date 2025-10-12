"use client";
import { useState, useEffect } from "react";
import { getAllCategories, client } from "@/lib/sanity";
import Link from "next/link";
import { FolderPlus, Edit2, Trash2, Book } from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  const handleDelete = async (categoryId: string) => {
    if (confirm("Are you sure? This will not delete posts in this category.")) {
      await client.delete(categoryId);
      loadCategories();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 min-h-screen">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 transition-colors">Categories</h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">Manage blog categories and organize your content</p>
        </div>
        <Link
          href="/admin-kelas/categories/new"
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 
                   bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 
                   dark:hover:bg-blue-700 text-white text-sm font-medium 
                   rounded-lg shadow-sm transition-all hover:shadow-md"
        >
          <FolderPlus className="w-4 h-4 mr-2" />
          Add Category
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.length === 0 ? (
          <div
            className="col-span-full text-center py-12 bg-gray-50 dark:bg-gray-800/30 
                       rounded-xl border border-gray-200 dark:border-gray-700/30 backdrop-blur-sm"
          >
            <p className="text-gray-500 dark:text-gray-400 mb-4">No categories found</p>
            <Link
              href="/admin-kelas/categories/new"
              className="inline-flex items-center px-4 py-2 bg-blue-500 
                       hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 
                       text-white text-sm font-medium rounded-lg transition-colors"
            >
              <FolderPlus className="w-4 h-4 mr-2" />
              Create your first category
            </Link>
          </div>
        ) : (
          categories.map((category: any) => (
            <div
              key={category._id}
              className="bg-white dark:bg-gray-800/30 rounded-xl shadow-sm 
                       border border-gray-200 dark:border-gray-700/30 
                       hover:shadow-md transition-all backdrop-blur-sm
                       group hover:scale-[1.02]"
            >
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg
                                group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20
                                transition-colors"
                  >
                    <Book className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2
                      className="text-lg font-semibold text-gray-900 dark:text-gray-100 
                                 truncate transition-colors"
                    >
                      {category.title}
                    </h2>
                    {category.description && <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{category.description}</p>}
                    <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-medium">{category.postCount}</span>
                      <span className="ml-1">{category.postCount === 1 ? "post" : "posts"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="border-t border-gray-200/50 dark:border-gray-700/30 
                          bg-gray-50/50 dark:bg-gray-800/20 p-3 flex justify-end gap-2"
              >
                <Link
                  href={`/admin-kelas/categories/${category.slug}/edit`}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium 
                           text-gray-700 dark:text-gray-300 hover:text-blue-600 
                           dark:hover:text-blue-400 transition-colors"
                >
                  <Edit2 className="w-4 h-4 mr-1.5" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium 
                           text-red-600 dark:text-red-400 hover:text-red-700 
                           dark:hover:text-red-300 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-1.5" />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
