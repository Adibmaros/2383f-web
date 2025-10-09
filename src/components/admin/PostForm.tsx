"use client";
import { ChangeEvent, FormEvent } from "react";
import { Upload, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";

interface PostFormProps {
  formTitle: string;
  formData: any;
  authors: any[];
  categories: any[];
  imageFile: File | null;
  onSubmit: (e: FormEvent) => void;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onCategoryToggle: (id: string) => void;
}

export default function PostForm({ formTitle, formData, authors, categories, imageFile, onSubmit, onChange, onImageUpload, onCategoryToggle }: PostFormProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/admin/posts"
        className="inline-flex items-center text-sm text-gray-500 
                 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Posts
      </Link>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{formTitle}</h1>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Form fields here - similar to existing but with better styling */}
        </form>
      </div>
    </div>
  );
}
