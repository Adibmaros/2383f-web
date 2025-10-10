"use client";
import { useState } from "react";
import { client } from "@/lib/sanity";
import { useRouter } from "next/navigation";

export default function NewCategoryPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const doc = {
      _type: "category",
      title: formData.title,
      description: formData.description,
      slug: {
        _type: "slug",
        current: formData.title.toLowerCase().replace(/\s+/g, "-"),
      },
    };

    await client.create(doc);
    router.push("/admin/categories");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div
        className="bg-white dark:bg-gray-800/30 shadow-sm rounded-xl 
                    border border-gray-200 dark:border-gray-700/30 p-6
                    backdrop-blur-sm"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 transition-colors">New Category</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700/50 
                       rounded-lg bg-white dark:bg-gray-800/50 
                       text-gray-900 dark:text-gray-100
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                       transition-colors backdrop-blur-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700/50 
                       rounded-lg bg-white dark:bg-gray-800/50 
                       text-gray-900 dark:text-gray-100
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                       transition-colors backdrop-blur-sm resize-y"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-500 dark:bg-blue-600 text-white 
                     rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700
                     focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                     transition-colors font-medium"
          >
            Create Category
          </button>
        </form>
      </div>
    </div>
  );
}
