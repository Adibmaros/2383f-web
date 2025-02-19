// ProfilePage.tsx
"use client";
import Link from "next/link";
import React from "react";

import { members } from "@/lib/data";

const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">Profil Anggota Kelas 2383F</h1>
      <p className="text-lg text-center mb-10">Kami adalah mahasiswa Program Studi Sistem Informasi angkatan 2023, Fakultas Sains dan Teknologi. Inilah anggota tim yang siap berkolaborasi dan bertumbuh bersama.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {members.map((member, index) => (
          <div key={index} className="bg-white p-4 rounded-2xl shadow-lg text-center">
            <img src={member.imageUrl} alt={member.name} className="w-24 h-24 mx-auto rounded-full object-cover mb-4" />
            <h3 className="text-xl font-semibold text-indigo-500">{member.name}</h3>
            <p className="text-gray-600 text-sm font-medium">{member.role}</p>
            <Link className="inline-block mt-2 text-sm text-blue-500 hover:underline" href={`/profile/${member.name.toLowerCase().replace(/\s+/g, "-")}`}>
              Lihat detail
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm">"Kami percaya, bersama kita bisa mencapai hal-hal luar biasa."</p>
      </div>
    </div>
  );
};

export default ProfilePage;
