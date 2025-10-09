"use client";
import { useState, useEffect } from "react";
import { writeClient as client, urlFor } from "@/lib/sanity";
import { useRouter } from "next/navigation";
import { getAllAuthors, getAllCategories, getPostBySlug } from "@/lib/sanity";
import { use } from "react";

export default function EditPostPage({ params }: any) {
  const resolvedParams = use(params) as { slug: string };
  const router = useRouter();
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    body: "",
    mainImage: null as any,
    authorId: "",
    categoryIds: [] as string[],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [post, authorsData, categoriesData] = await Promise.all([getPostBySlug(resolvedParams.slug), getAllAuthors(), getAllCategories()]);

      setAuthors(authorsData);
      setCategories(categoriesData);

      if (post) {
        setFormData({
          _id: post._id,
          title: post.title,
          body: Array.isArray(post.body) ? post.body[0]?.children[0]?.text || "" : "",
          mainImage: post.mainImage,
          authorId: post.author?._id || "",
          categoryIds: post.categories?.map((cat: any) => cat._id) || [],
        });
      }
    } catch (error) {
      console.error("Error loading post data:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const doc: {
      title: string;
      body: any[];
      author: { _type: string; _ref: string };
      categories: any[];
      mainImage?: any;
    } = {
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
    };

    if (formData.mainImage) {
      doc.mainImage = formData.mainImage;
    }

    try {
      await client.patch(formData._id).set(doc).commit();

      router.push("/admin/posts");
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Error updating post. Check console for details.");
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
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Title</label>
          <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-2 border rounded" required />
        </div>

        <div>
          <label className="block mb-2">Main Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border rounded" />
          {(imageFile || formData.mainImage) && (
            <div className="mt-2">
              <img src={imageFile ? URL.createObjectURL(imageFile) : urlFor(formData.mainImage).width(300).url()} alt="Preview" className="w-32 h-32 object-cover rounded" />
            </div>
          )}
        </div>

        <div>
          <label className="block mb-2">Author</label>
          <select value={formData.authorId} onChange={(e) => setFormData({ ...formData, authorId: e.target.value })} className="w-full p-2 border rounded" required>
            <option value="">Select an author</option>
            {authors.map((author: any) => (
              <option key={author._id} value={author._id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">Categories</label>
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
          <label className="block mb-2">Content</label>
          <textarea value={formData.body} onChange={(e) => setFormData({ ...formData, body: e.target.value })} className="w-full p-2 border rounded" rows={10} required />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Post
        </button>
      </form>
    </div>
  );
}
