"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { Console } from "@/components/editor/Console";
import { Button } from "@/components/ui/Button";
import { Play, RotateCcw, Edit2 } from "lucide-react";
import { motion } from "framer-motion";

// Define the shape of the data we get from the backend
interface BackendTopic {
  id: string;
  title: string;
  description?: string;
  code: string;
}

export default function TopicPage() {
  const params = useParams();
  const [topic, setTopic] = useState<BackendTopic | null>(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState<{ type: 'stdout' | 'stderr' | 'info'; content: string }[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState<any[]>([]);

  useEffect(() => {
    async function fetchTopic() {
      if (!params.id) return;
      
      setIsFetching(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topic/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch topic");
        
        const data = await res.json();
        
        // Handle case where backend returns error object
        if (data.error) {
            console.error("Topic not found:", data.error);
            setTopic(null);
        } else {
            setTopic(data);
            setCode(data.code || "");
        }
      } catch (err) {
        console.error(err);
        setTopic(null);
      } finally {
        setIsFetching(false);
      }
    }

    fetchTopic();
  }, [params.id]);

  const handleRun = async () => {
    setIsLoading(true);
    setOutput([]);
    setIsError(false);
    setErrors([]);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      
      if (data.stderr) {
        setIsError(true);
        setOutput((prev) => [...prev, { type: 'stderr', content: data.stderr }]);
        
        // Parse traceback to find line numbers
        const tracebackRegex = /File ".*", line (\d+)/g;
        let match;
        const newErrors = [];
        while ((match = tracebackRegex.exec(data.stderr)) !== null) {
          const lineNumber = parseInt(match[1], 10);
          // Account for the prepended code (utf8 config is 6 lines)
          // Adjust this offset if the header changes!
          // User code starts after the header.
          const userLineNumber = Math.max(1, lineNumber - 7); 
          
          newErrors.push({
            startLineNumber: userLineNumber,
            startColumn: 1,
            endLineNumber: userLineNumber,
            endColumn: 1000,
            message: "Runtime Error: Check console for details",
            severity: 8 // Error
          });
        }
        setErrors(newErrors);
      }
      if (data.stdout) {
        setOutput((prev) => [...prev, { type: 'stdout', content: data.stdout }]);
      }
      if (!data.stderr && !data.stdout) {
         // If there's a return code other than 0 and no output, might be an error
         if (data.returncode !== 0) {
             setIsError(true);
             setOutput((prev) => [...prev, { type: 'stderr', content: `Process exited with code ${data.returncode}` }]);
         } else {
             setOutput((prev) => [...prev, { type: 'info', content: "Code executed successfully (no output)." }]);
         }
      }

    } catch (error) {
      setIsError(true);
      setOutput([{ type: 'stderr', content: "Error connecting to server. Is the backend running?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (topic) {
      setCode(topic.code);
      setOutput([]);
      setIsError(false);
      setErrors([]);
    }
  };

  if (isFetching) {
    return <div className="flex h-full items-center justify-center text-slate-400">Loading topic from database...</div>;
  }

  if (!topic) {
    return <div className="flex h-full items-center justify-center text-red-400">Topic not found or backend unavailable.</div>;
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <h1 className="text-2xl font-bold text-white">{topic.title}</h1>
        <p className="text-slate-400">{topic.description || "Interactive Python Lesson"}</p>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col gap-4 lg:flex-row min-h-0">
        {/* Editor Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-1 flex-col lg:w-1/2 min-h-0"
        >
          <div className="flex-1 relative rounded-lg border border-slate-800 shadow-lg overflow-hidden min-h-0">
             {/* Edit Overlay/Indicator */}
             <div className="absolute top-2 right-4 z-10 flex items-center space-x-2">
                <span className={`text-xs font-mono px-2 py-1 rounded ${isEditing ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/30' : 'bg-slate-800 text-slate-500'}`}>
                    {isEditing ? "EDIT MODE" : "READ ONLY"}
                </span>
             </div>
             
             <CodeEditor 
                code={code} 
                onChange={(val) => setCode(val || "")} 
                readOnly={!isEditing}
                errors={errors}
             />
          </div>

          {/* Controls */}
          <div className="mt-4 flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/50 p-3 backdrop-blur">
            <div className="flex space-x-3">
              <Button
                variant={isEditing ? "neon" : "outline"}
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className={isEditing ? "box-glow-blue" : ""}
              >
                <Edit2 className="mr-2 h-4 w-4" />
                {isEditing ? "Editing..." : "Edit Code"}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
            <Button 
                variant="primary" 
                onClick={handleRun} 
                isLoading={isLoading}
                className="bg-green-600 hover:bg-green-700 shadow-green-500/20"
            >
              <Play className="mr-2 h-4 w-4" />
              Run Code
            </Button>
          </div>
        </motion.div>

        {/* Console Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="h-64 lg:h-full lg:w-1/2 flex flex-col min-h-0"
        >
          <Console output={output} isError={isError} isLoading={isLoading} />
        </motion.div>
      </div>
    </div>
  );
}
