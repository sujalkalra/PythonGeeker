"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import CodeEditor from "@/components/CodeEditor";
import Console from "@/components/Console";
import { runPythonCode } from "@/lib/api";

export default function Home() {
  const [code, setCode] = useState(`print("Hello, PythonGeeker!")`);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRun() {
    setLoading(true);
    setOutput("Running...\n");

    try {
      const result = await runPythonCode(code);
      setOutput(result.stdout || result.stderr || "No output");
    } catch (err) {
      setOutput("❌ Error running code");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">
            Python Basics → Print Function
          </h2>

          <button
            className={`px-4 py-1 rounded text-sm ${
              loading
                ? "bg-zinc-600 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
            onClick={handleRun}
            disabled={loading}
          >
            ▶ {loading ? "Running..." : "Run"}
          </button>
        </div>

        {/* Editor + Console */}
        <div className="flex flex-1 gap-4">
          <div className="w-2/3 bg-zinc-900 rounded-lg overflow-hidden">
            <CodeEditor code={code} onChange={setCode} />
          </div>

          <div className="w-1/3">
            <Console output={output} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
