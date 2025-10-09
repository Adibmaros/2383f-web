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
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">New Category</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Title</label>
          <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-2 border rounded" required />
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2 border rounded" rows={4} />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Category
        </button>
      </form>
    </div>
  );
}
