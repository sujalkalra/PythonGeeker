export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 border-r border-zinc-800 p-4">
        <h1 className="text-xl font-bold mb-6">🐍 PythonGeeker</h1>
        <nav className="space-y-2 text-sm">
          <div className="text-zinc-400">Python Basics</div>
          <div className="pl-3 space-y-1">
            <p className="hover:text-white cursor-pointer">Print</p>
            <p className="hover:text-white cursor-pointer">Variables</p>
          </div>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}