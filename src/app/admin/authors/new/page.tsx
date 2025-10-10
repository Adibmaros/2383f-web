"use client";
import { useState } from "react";
import { writeClient as client } from "@/lib/sanity";
import { useRouter } from "next/navigation";
import { Upload, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewAuthorPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    image: null as any,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Upload image if exists
      let imageAsset;
      if (imageFile) {
        imageAsset = await client.assets.upload("image", imageFile);
      }

      const doc = {
        _type: "author",
        name: formData.name,
        slug: {
          _type: "slug",
          current: formData.name.toLowerCase().replace(/\s+/g, "-"),
        },
        bio: [
          {
            _type: "block",
            style: "normal",
            _key: Date.now().toString(),
            children: [
              {
                _type: "span",
                text: formData.bio,
                _key: `span_${Date.now()}`,
              },
            ],
            markDefs: [],
          },
        ],
        ...(imageAsset && {
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: imageAsset._id,
            },
          },
        }),
      };

      await client.create(doc);
      router.push("/admin/authors");
    } catch (error) {
      console.error("Error creating author:", error);
      alert("Error creating author");
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 dark:border-gray-700 dark:shadow-xl">
      <Link
        href="/admin/authors"
        className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300 
                 hover:text-gray-900 dark:hover:text-gray-100 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Authors
      </Link>

      <div
        className="bg-white dark:bg-gray-800/30 shadow-sm rounded-xl 
                    border border-gray-200 dark:border-gray-700/30 p-6
                    backdrop-blur-sm"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Create New Author</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700/50 
                       rounded-lg bg-white dark:bg-gray-800/50 
                       text-gray-900 dark:text-gray-100
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                       transition-colors backdrop-blur-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Profile Image</label>
            <div className="mt-1 flex items-center gap-4">
              {imageFile ? (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="w-32 h-32 rounded-lg object-cover border
                           border-gray-200 dark:border-gray-700/50"
                />
              ) : (
                <div
                  className="w-32 h-32 border-2 border-dashed 
                             border-gray-300 dark:border-gray-700/50 rounded-lg 
                             flex items-center justify-center bg-gray-50
                             dark:bg-gray-800/30"
                >
                  <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
              )}
              <div>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" />
                <label
                  htmlFor="image-upload"
                  className="inline-flex items-center px-4 py-2 border 
                           border-gray-200 dark:border-gray-700/50 rounded-lg
                           text-sm font-medium text-gray-700 dark:text-gray-200
                           bg-white dark:bg-gray-800/50 hover:bg-gray-50 
                           dark:hover:bg-gray-800/70 cursor-pointer
                           transition-colors backdrop-blur-sm"
                >
                  Choose Image
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700/50 
                       rounded-lg bg-white dark:bg-gray-800/50 
                       text-gray-900 dark:text-gray-100
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                       transition-colors backdrop-blur-sm resize-y"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-500 dark:bg-blue-600 text-white 
                       rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                       transition-colors font-medium"
            >
              Create Author
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
