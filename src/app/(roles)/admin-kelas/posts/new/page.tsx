"use client";
import { useState, useEffect } from "react";
import { writeClient as client } from "@/lib/sanity";
import { useRouter } from "next/navigation";
import { getAllAuthors, getAllCategories } from "@/lib/sanity";

export default function NewPostPage() {
  const router = useRouter();
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState<File | null>(null);

  interface MainImageAsset {
    _id: string;
    hotspot?: any;
    [key: string]: any;
  }

  const [formData, setFormData] = useState<{
    title: string;
    body: string;
    mainImage: MainImageAsset | null;
    authorId: string;
    categoryIds: string[];
  }>({
    title: "",
    body: "",
    mainImage: null,
    authorId: "",
    categoryIds: [],
  });

  useEffect(() => {
    loadAuthorsAndCategories();
  }, []);

  const loadAuthorsAndCategories = async () => {
    const [authorsData, categoriesData] = await Promise.all([getAllAuthors(), getAllCategories()]);
    setAuthors(authorsData);
    setCategories(categoriesData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const doc = {
      _type: "post",
      title: formData.title,
      body: [
        {
          _type: "block",
          style: "normal",
          _key: new Date().getTime().toString(),
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: `span_${new Date().getTime()}`,
              text: formData.body,
              marks: [],
            },
          ],
        },
      ],
      author: {
        _type: "reference",
        _ref: formData.authorId,
      },
      categories: formData.categoryIds.map((id) => ({
        _type: "reference",
        _ref: id,
      })),
      publishedAt: new Date().toISOString(),
      slug: {
        _type: "slug",
        current: formData.title.toLowerCase().replace(/\s+/g, "-"),
      },
      ...(formData.mainImage
        ? {
            mainImage: {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: formData.mainImage._id,
              },
              hotspot: formData.mainImage.hotspot,
            },
          }
        : {}),
    };

    try {
      const result = await client.create(doc);
      console.log("Created post:", result);
      router.push("/admin-kelas/posts");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post. Check console for details.");
    }
  };
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      try {
        const asset = await client.assets.upload("image", file);
        setFormData({ ...formData, mainImage: asset });
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image");
      }
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(categoryId) ? prev.categoryIds.filter((id) => id !== categoryId) : [...prev.categoryIds, categoryId],
    }));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-200">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg
                     bg-white dark:bg-gray-800/50 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                     transition-colors backdrop-blur-sm"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-200">Main Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg
                     bg-white dark:bg-gray-800/50 text-gray-900 dark:text-gray-100
                     file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                     file:bg-blue-500 file:text-white hover:file:bg-blue-600
                     transition-colors"
          />
          {imageFile && (
            <div className="mt-3">
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border
                         border-gray-200 dark:border-gray-700"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-200">Author</label>
          <select
            value={formData.authorId}
            onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg
                     bg-white dark:bg-gray-800/50 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                     transition-colors"
            required
          >
            <option value="">Select an author</option>
            {authors.map((author: any) => (
              <option key={author._id} value={author._id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-200">Categories</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category: any) => (
              <button
                key={category._id}
                type="button"
                onClick={() => handleCategoryToggle(category._id)}
                className={`px-3 py-1 rounded-full border transition-colors ${formData.categoryIds.includes(category._id) ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"}`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-200">Content</label>
          <textarea
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg
                     bg-white dark:bg-gray-800/50 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                     transition-colors min-h-[200px] resize-y"
            required
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Basic text content. For rich text, consider using a rich text editor component.</p>
        </div>

        <button
          type="submit"
          className="bg-blue-500 dark:bg-blue-600 text-white px-6 py-3 rounded-lg
                   hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors
                   focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                   font-medium"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
