import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export const uploadImage = async (file: File, path: string = "divisi"): Promise<string> => {
  const fileType = file.type.split("/")[1];
  const fileName = `${path}-${Date.now()}.${fileType}`;

  const { error } = await supabase.storage.from("images").upload(`public/${path}/${fileName}`, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    console.error("Upload error:", error);
    throw error;
  }

  console.log("Uploaded file:", fileName);
  return fileName;
};

export const getImageUrl = (name: string, path: string = "divisi"): string => {
  const { data } = supabase.storage.from("images").getPublicUrl(`public/${path}/${name}`);

  return data.publicUrl;
};

export const deleteFile = async (fileName: string, path: string = "brands"): Promise<void> => {
  const { error } = await supabase.storage.from("images").remove([`public/${path}/${fileName}`]);

  if (error) {
    console.error("Delete error:", error);
    throw error;
  }
};
