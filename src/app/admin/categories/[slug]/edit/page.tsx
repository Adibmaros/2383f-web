"use client";
import { useState, useEffect } from "react";
import { writeClient as client } from "@/lib/sanity";
import { useRouter } from "next/navigation";
import { getCategoryBySlug } from "@/lib/sanity";
import { use } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    try {
      const category = await getCategoryBySlug(resolvedParams.slug);
      if (category) {
        setFormData({
          _id: category._id,
          title: category.title,
          description: category.description || "",
        });
      }
    } catch (error) {
      console.error("Error loading category:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const doc = {
      title: formData.title,
      description: formData.description,
      slug: {
        _type: "slug",
        current: formData.title.toLowerCase().replace(/\s+/g, "-"),
      },
    };

    try {
      await client.patch(formData._id).set(doc).commit();
      router.push("/admin/categories");
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Error updating category. Check console for details.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link
        href="/admin/categories"
        className="inline-flex items-center text-sm text-gray-500 
                 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Categories
      </Link>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Category</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter a brief description of this category..."
            />
            <p className="mt-2 text-sm text-gray-500">This helps readers understand what kind of content to expect.</p>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent 
                       rounded-md shadow-sm text-sm font-medium text-white 
                       bg-blue-600 hover:bg-blue-700 focus:outline-none 
                       focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
