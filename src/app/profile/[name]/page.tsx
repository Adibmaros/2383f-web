import { notFound } from "next/navigation";
import { members } from "@/lib/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface PageProps {
  params: { name: string };
}

const ProfileDetailPage = async ({ params }: PageProps) => {
  const { name } = await params;
  const member = members.find((m) => m.name.toLowerCase().replace(/\s+/g, "-") === name);

  if (!member) {
    return notFound();
  }

  const details = [
    { label: "Hobi", value: member.hobbies },
    { label: "Impian", value: member.dreams },
    { label: "Motto", value: member.motto },
    { label: "Makanan Favorit", value: member.favoriteFood },
    { label: "Pesan untuk Kelas", value: member.classMessage },
    { label: "Tujuan Kelas", value: member.classGoals },
  ];

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center space-y-4">
          <div className="relative w-32 h-32 mx-auto">
            <img src={member.imageUrl} alt={member.name} className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">{member.name}</h1>
            <p className="text-lg text-gray-600 font-medium">{member.role}</p>
            <p className="text-gray-500 italic">{member.bio}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {details.map((detail, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">{detail.label}</h3>
                <p className="text-gray-800">{detail.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDetailPage;
