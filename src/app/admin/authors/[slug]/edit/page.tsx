"use client";
import { useState, useEffect } from "react";
import { writeClient as client, urlFor } from "@/lib/sanity";
import { useRouter } from "next/navigation";
import { getAuthorBySlug } from "@/lib/sanity";
import { use } from "react";

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

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Author</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Name</label>
          <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2 border rounded" required />
        </div>

        <div>
          <label className="block mb-2">Profile Image</label>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full p-2 border rounded" />
          {(imageFile || formData.image) && <img src={imageFile ? URL.createObjectURL(imageFile) : urlFor(formData.image).url()} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />}
        </div>

        <div>
          <label className="block mb-2">Bio</label>
          <textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} className="w-full p-2 border rounded" rows={4} />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Author
        </button>
      </form>
    </div>
  );
}
