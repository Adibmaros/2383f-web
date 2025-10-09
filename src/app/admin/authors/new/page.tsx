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
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/admin/authors" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Authors
      </Link>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Author</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                       focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
            <div className="mt-1 flex items-center">
              {imageFile ? (
                <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-32 h-32 rounded-lg object-cover" />
              ) : (
                <div
                  className="w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg 
                               flex items-center justify-center"
                >
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <div className="ml-5">
                <input type="file" accept="image/*" onChange={handleImageChange} className="sr-only" id="image-upload" />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border 
                           border-gray-300 shadow-sm text-sm font-medium rounded-md 
                           text-gray-700 bg-white hover:bg-gray-50"
                >
                  Choose Image
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                       focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent 
                       rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 
                       hover:bg-blue-700 focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Author
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
