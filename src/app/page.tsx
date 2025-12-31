"use client";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 font-sans">
      <main className="w-full max-w-lg p-10 bg-white/90 dark:bg-zinc-900/90 rounded-3xl shadow-2xl flex flex-col items-center gap-10 border border-zinc-200 dark:border-zinc-800">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400 mb-2 text-center">
          APK Management Portal
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300 text-center mb-6 max-w-md">
          Upload, manage, and download your Fusion and True-Trace APKs with
          ease.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 w-full">
          <a
            href="/fusion-apk"
            className="flex-1 flex flex-col items-center justify-center gap-2 px-6 py-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-200"
          >
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z"
              />
            </svg>
            <span className="text-xl font-semibold">Fusion APK</span>
            <span className="text-sm opacity-80">
              Upload & Download Fusion APKs
            </span>
          </a>
          <a
            href="/true-trace-apk"
            className="flex-1 flex flex-col items-center justify-center gap-2 px-6 py-6 rounded-2xl bg-gradient-to-br from-green-500 to-green-700 text-white shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-200"
          >
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z"
              />
            </svg>
            <span className="text-xl font-semibold">True-Trace APK</span>
            <span className="text-sm opacity-80">
              Upload & Download True-Trace APKs
            </span>
          </a>
        </div>
      </main>
    </div>
  );
}
