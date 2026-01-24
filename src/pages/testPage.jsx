import { useState } from "react";
import uploadFile from "../utils/mediaUpload";

export default function TestPage() {
  const [file, setFile] = useState(null);

  async function handleUpload() {
    if (!file) {
      console.log("No file selected");
      return;
    }

    try {
      const url = await uploadFile(file);
      console.log("Public URL:", url);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        onClick={handleUpload}
        className="bg-red-900 p-2 text-white rounded-xl"
      >
        Upload
      </button>
    </div>
  );
}
