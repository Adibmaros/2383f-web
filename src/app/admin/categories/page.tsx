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
    <div className="max-w-7xl mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="mt-2 text-sm text-gray-700">Manage blog categories and organize your content</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 
                   bg-blue-600 hover:bg-blue-700 text-white text-sm 
                   font-medium rounded-md shadow-sm transition-colors"
        >
          <FolderPlus className="w-4 h-4 mr-2" />
          Add Category
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-4">No categories found</p>
            <Link
              href="/admin/categories/new"
              className="inline-flex items-center px-4 py-2 bg-blue-600 
                       hover:bg-blue-700 text-white text-sm font-medium rounded-md"
            >
              <FolderPlus className="w-4 h-4 mr-2" />
              Create your first category
            </Link>
          </div>
        ) : (
          categories.map((category: any) => (
            <div
              key={category._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 
                       hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Book className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-gray-900 truncate">{category.title}</h2>
                    {category.description && <p className="mt-1 text-sm text-gray-500 line-clamp-2">{category.description}</p>}
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <span className="font-medium">{category.postCount}</span>
                      <span className="ml-1">{category.postCount === 1 ? "post" : "posts"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 bg-gray-50 p-3 flex justify-end gap-2">
                <Link
                  href={`/admin/categories/${category.slug}/edit`}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium 
                           text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Edit2 className="w-4 h-4 mr-1.5" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium 
                           text-red-600 hover:text-red-700 transition-colors"
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
