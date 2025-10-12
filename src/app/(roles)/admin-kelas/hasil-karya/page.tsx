"use client";

import React, { useState } from "react";
import { members } from "@/lib/data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Karya, KaryaInput } from "@/types/karya";
import { uploadImage, deleteFile } from "@/lib/supabase";
import { toast } from "sonner";

const defaultForm: KaryaInput = {
  title: "",
  description: "",
  imageUrl: "",
  link: "",
  dibuatOleh: "",
};

export default function HasilKaryaPage() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<KaryaInput>(defaultForm);
  const [editId, setEditId] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Fetch Karya
  const { data: karya, isLoading } = useQuery<Karya[]>({
    queryKey: ["karya"],
    queryFn: () => fetch("/api/karya").then((res) => res.json()),
  });

  // Create Karya
  const createMutation = useMutation({
    mutationFn: async (data: KaryaInput) => {
      const res = await fetch("/api/karya", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["karya"] });
      resetForm();
      toast.success("Karya berhasil ditambahkan");
    },
  });

  // Update Karya
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: KaryaInput }) => {
      const res = await fetch(`/api/karya/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["karya"] });
      resetForm();
      toast.success("Karya berhasil diupdate");
    },
  });

  // Delete Karya
  const deleteMutation = useMutation({
    mutationFn: async (karya: Karya) => {
      // Delete image from Supabase
      if (karya.imageUrl) {
        const fileName = karya.imageUrl.split("/").pop();
        if (fileName) await deleteFile(fileName, "karya");
      }
      // Delete from database
      const res = await fetch(`/api/karya/${karya.id}`, {
        method: "DELETE",
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["karya"] });
      toast.success("Karya berhasil dihapus");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = form.imageUrl;

      // Handle image upload if there's a new file
      if (imageFile) {
        const fileName = await uploadImage(imageFile, "karya");
        imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/public/karya/${fileName}`;
      }

      const data = { ...form, imageUrl };

      if (editId) {
        updateMutation.mutate({ id: editId, data });
      } else {
        createMutation.mutate(data);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan");
    }
  };

  const handleEdit = (karya: Karya) => {
    setForm({
      title: karya.title,
      description: karya.description,
      imageUrl: karya.imageUrl,
      link: karya.link,
      dibuatOleh: karya.dibuatOleh,
    });
    setEditId(karya.id);
  };

  const resetForm = () => {
    setForm(defaultForm);
    setEditId(null);
    setImageFile(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Manajemen Hasil Karya</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid gap-4 mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <div className="grid gap-4 md:grid-cols-2">
          <input type="text" placeholder="Judul karya" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="p-2 border rounded-lg" required />
          <input type="text" placeholder="Link karya" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} className="p-2 border rounded-lg" required />
        </div>

        <textarea placeholder="Deskripsi" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="p-2 border rounded-lg" rows={3} required />

        <div className="grid gap-4 md:grid-cols-2">
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="p-2 border rounded-lg" />

          <select value={form.dibuatOleh} onChange={(e) => setForm({ ...form, dibuatOleh: e.target.value })} className="p-2 border rounded-lg" required>
            <option value="">Pilih Pembuat</option>
            {members.map((member, index) => (
              <option key={index} value={member.name}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            {editId ? "Update" : "Submit"}
          </button>
          {editId && (
            <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          karya?.map((item) => (
            <div key={item.id} className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
              {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover rounded-lg mb-4" />}
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{item.description}</p>
              <p className="text-sm text-gray-500">Dibuat oleh: {item.dibuatOleh}</p>
              <div className="flex gap-2 mt-4">
                <button onClick={() => handleEdit(item)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Edit
                </button>
                <button onClick={() => deleteMutation.mutate(item)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
