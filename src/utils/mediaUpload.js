import { createClient } from "@supabase/supabase-js";

const url =
  "https://vhxcjzgxczttlsoqbwnw.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoeGNqemd4Y3p0dGxzb3Fid253Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwODU1MzQsImV4cCI6MjA4NDY2MTUzNH0.HMl11wqaaprPRiDoO8l5DlFLI8DRJujAaW6wjjARITI";

const supabase = createClient(url, key);

export default function uploadFile(file) {
  return new Promise((resolve, reject) => {
    const timeStamp = Date.now();
    const fileName = `${timeStamp}_${file.name}`;

    supabase.storage
      .from("images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then(() => {
        const { data } = supabase.storage
          .from("images")
          .getPublicUrl(fileName); // [web:51][web:129]
        resolve(data.publicUrl);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
