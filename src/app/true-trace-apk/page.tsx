"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TrueTraceApkPage() {
  const [apkName, setApkName] = useState("");
  const [version, setVersion] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a file");
    setUploading(true);
    setMessage("");
    const filePath = `true-trace-apk/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("apks").upload(filePath, file);
    if (error) {
      setMessage("Upload failed: " + error.message);
      setUploading(false);
      return;
    }
    // Send metadata to API
    const res = await fetch("/api/true-trace-apk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apk_name: apkName, version, file_path: filePath }),
    });
    if (res.ok) {
      setMessage("Upload successful!");
      setApkName("");
      setVersion("");
      setFile(null);
    } else {
      setMessage("Failed to save metadata");
    }
    setUploading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">True-Trace APK Upload</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="APK Name"
          value={apkName}
          onChange={e => setApkName(e.target.value)}
          className="w-full border p-2"
          required
        />
        <input
          type="text"
          placeholder="Version"
          value={version}
          onChange={e => setVersion(e.target.value)}
          className="w-full border p-2"
          required
        />
        <input
          type="file"
          accept=".apk"
          onChange={e => setFile(e.target.files?.[0] || null)}
          className="w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
