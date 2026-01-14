export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl p-6 text-slate-300">
      <h1 className="mb-6 text-3xl font-bold text-white">About PythonGeeker</h1>
      <div className="space-y-4 text-lg leading-relaxed">
        <p>
          <strong className="text-neon-blue">PythonGeeker</strong> is a 2026-ready learning platform designed to help you master Python at the speed of light ⚡.
        </p>
        <p>
          Our mission is to provide a professional, developer-focused environment where you can learn by doing. 
          Forget boring text tutorials; here you write code from day one in a powerful, interactive sandbox.
        </p>
        <h2 className="pt-4 text-xl font-bold text-white">Why PythonGeeker?</h2>
        <ul className="list-disc pl-6 space-y-2">
            <li>Interactive LeetCode-style coding experience</li>
            <li>Dark-themed professional UI</li>
            <li>Instant feedback and execution</li>
            <li>Structured modules from Beginner to Advanced</li>
        </ul>
        <p className="pt-8 text-sm text-slate-500">
          Built with Next.js, FastAPI, and ❤️ by the PythonGeeker Team.
        </p>
      </div>
    </div>
  );
}
