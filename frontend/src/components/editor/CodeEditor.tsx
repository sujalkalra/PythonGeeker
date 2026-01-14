"use client";

import Editor, { OnMount, Monaco } from "@monaco-editor/react";
import { useEffect, useState, useRef } from "react";

export interface EditorError {
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
  message: string;
  severity?: number;
}

interface CodeEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
  readOnly: boolean;
  errors?: EditorError[];
}

export function CodeEditor({ code, onChange, readOnly, errors = [] }: CodeEditorProps) {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const decorationsRef = useRef<string[]>([]); // Track decorations to clear them later

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    setEditorLoaded(true);
    editorRef.current = editor;
    monacoRef.current = monaco;

    monaco.editor.defineTheme("python-geeker-theme", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#020617", // slate-950
        "editor.lineHighlightBackground": "#1e293b", // slate-800
        "editorCursor.foreground": "#00f0ff", // neon-blue
        "editor.selectionBackground": "#3b82f640", // blue-500 with opacity
      },
    });
    monaco.editor.setTheme("python-geeker-theme");
  };

  useEffect(() => {
    if (monacoRef.current && editorRef.current) {
      // 1. Convert errors to Full-Line Background Decorations
      const newDecorations = errors.map(err => ({
        range: new monacoRef.current!.Range(
          err.startLineNumber, 
          1, 
          err.endLineNumber, 
          1
        ),
        options: {
          isWholeLine: true,
          className: "error-line-highlight", // CSS class in globals.css
          hoverMessage: { value: err.message },
          minimap: { color: "rgba(220, 38, 38, 0.5)", position: 1 } // Inline minimap decoration type
        },
      }));

      // 2. Apply decorations (deltaDecorations clears old ones using IDs in decorationsRef)
      decorationsRef.current = editorRef.current.deltaDecorations(
        decorationsRef.current,
        newDecorations
      );
    }
  }, [errors]);

  return (
    <div className="h-full w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-950 shadow-inner">
      <Editor
        height="100%"
        defaultLanguage="python"
        value={code}
        onChange={onChange}
        theme="vs-dark" // Will be overridden by onMount
        onMount={handleEditorDidMount}
        options={{
          readOnly: readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "Fira Code, monospace",
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          padding: { top: 16, bottom: 16 },
          scrollbar: {
            alwaysConsumeMouseWheel: false,
          },
        }}
      />
    </div>
  );
}
