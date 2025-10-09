"use client";
import { useEffect, useState } from "react";
import { getAllAuthors, client, urlFor } from "@/lib/sanity";
import Link from "next/link";
import { UserPlus, Pencil, Trash2 } from "lucide-react";

export default function AuthorsPage() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
    const data = await getAllAuthors();
    setAuthors(data);
  };

  const handleDelete = async (authorId: string) => {
    if (confirm("Are you sure? This will also affect posts by this author.")) {
      await client.delete(authorId);
      loadAuthors();
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Authors</h1>
          <p className="mt-2 text-sm text-gray-700">Manage your blog authors and their details</p>
        </div>
        <Link
          href="/admin/authors/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 
                   text-white text-sm font-medium rounded-md shadow-sm transition-colors"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add New Author
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {authors.map((author: any) => (
          <div
            key={author._id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 
                     overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center gap-4">
                {author.image ? (
                  <img src={urlFor(author.image).width(60).height(60).url()} alt={author.name} className="w-14 h-14 rounded-full object-cover border-2 border-gray-100" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-2xl text-gray-500">{author.name.charAt(0)}</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-gray-900 truncate">{author.name}</h2>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{author.postCount || 0}</span>
                    <span className="mx-1">•</span>
                    <span>{author.postCount === 1 ? "post" : "posts"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 bg-gray-50 p-3 flex justify-end gap-2">
              <Link
                href={`/admin/authors/${author.slug.current}/edit`}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium 
                         text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Pencil className="w-4 h-4 mr-1.5" />
                Edit
              </Link>
              <button
                onClick={() => handleDelete(author._id)}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium 
                         text-red-600 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-1.5" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {authors.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No authors found</p>
          <Link
            href="/admin/authors/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 
                     text-white text-sm font-medium rounded-md"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add your first author
          </Link>
        </div>
      )}
    </div>
  );
}
