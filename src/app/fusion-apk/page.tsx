"use client";

import { useState } from "react";
import { useForm } from 'react-hook-form';

export default function FusionApkPage() {
  const {  } = useForm();

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
    const formData = new FormData();
    formData.append("apk_name", apkName);
    formData.append("version", version);
    formData.append("file", file);
    try {
      const res = await fetch("/api/fusion-apks", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setMessage("Upload successful!");
        setApkName("");
        setVersion("");
        setFile(null);
      } else {
        const errorData = await res.json();
        setMessage(errorData.error || "Failed to upload APK");
      }
    } catch (err) {
      setMessage("Network error. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="w-full max-w-lg bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <svg className="w-10 h-10 text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 12h-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 22v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h1 className="text-2xl font-semibold text-white">Fusion APK Upload</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-300">APK Name</span>
            <input
              type="text"
              placeholder="My App"
              value={apkName}
              onChange={(e) => setApkName(e.target.value)}
              className="mt-1 block w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-300">Version</span>
            <input
              type="text"
              placeholder="1.0.0"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="mt-1 block w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-300">APK File</span>
            <div className="mt-1 flex items-center gap-3">
              <label className="flex-1 cursor-pointer">
                <div className="w-full rounded-lg border-2 border-dashed border-gray-700 bg-gray-800/50 px-4 py-3 text-gray-300 hover:border-indigo-500 transition">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">{file ? file.name : "Select an .apk file"}</div>
                    <div className="text-xs text-gray-400">{file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "Max 100MB"}</div>
                  </div>
                </div>
                <input
                  type="file"
                  accept=".apk"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                  required
                />
              </label>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-sm text-gray-300 hover:bg-gray-700"
              >
                Clear
              </button>
            </div>
          </label>

          <div className="pt-2">
            <button
              type="submit"
              disabled={uploading}
              className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 font-medium shadow hover:opacity-95 disabled:opacity-60"
            >
              {uploading ? "Uploading..." : "Upload APK"}
            </button>
          </div>
        </form>

        {message && (
          <div className="mt-4 text-center text-sm text-gray-200">{message}</div>
        )}
      </div>
    </div>
  );
}
