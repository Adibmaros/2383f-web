"use client";
import { useState, useEffect } from "react";
import { writeClient as client, urlFor } from "@/lib/sanity";
import { useRouter } from "next/navigation";
import { getAuthorBySlug } from "@/lib/sanity";
import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EditAuthorPage({ params }: any) {
  const router = useRouter();
  const [formData, setFormData] = useState<any>({
    _id: "",
    name: "",
    bio: "",
    image: null,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    loadAuthor();
  }, []);

  const loadAuthor = async () => {
    try {
      const author = await getAuthorBySlug(params.slug);
      if (author) {
        setFormData({
          _id: author._id,
          name: author.name,
          bio: author.bio?.[0]?.children?.[0]?.text || "",
          image: author.image,
        });
      }
    } catch (error) {
      console.error("Error loading author:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageAsset = formData.image;
      if (imageFile) {
        imageAsset = await client.assets.upload("image", imageFile);
      }

      const doc = {
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

      await client.patch(formData._id).set(doc).commit();
      router.push("/admin/authors");
    } catch (error) {
      console.error("Error updating author:", error);
      alert("Error updating author");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link
        href="/admin/authors"
        className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 
                 hover:text-gray-700 dark:hover:text-gray-300 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Authors
      </Link>

      <div
        className="bg-white dark:bg-gray-800/30 shadow-sm rounded-xl 
                    border border-gray-200 dark:border-gray-700/30 p-6
                    backdrop-blur-sm"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Edit Author</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700/50 
                       rounded-lg shadow-sm bg-white dark:bg-gray-800/50 
                       text-gray-900 dark:text-gray-100
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                       focus:border-blue-500 dark:focus:border-blue-400
                       transition-colors backdrop-blur-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700/50 
                       rounded-lg shadow-sm bg-white dark:bg-gray-800/50 
                       text-gray-900 dark:text-gray-100
                       file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                       file:bg-blue-500 file:text-white hover:file:bg-blue-600
                       transition-colors"
            />
            {imageFile && (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg border 
                         border-gray-200 dark:border-gray-600"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700/50 
                       rounded-lg shadow-sm bg-white dark:bg-gray-800/50 
                       text-gray-900 dark:text-gray-100
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                       focus:border-blue-500 dark:focus:border-blue-400
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
              Update Author
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
