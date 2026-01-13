"use client";

import Editor from "@monaco-editor/react";

interface Props {
  code: string;
  onChange?: (value: string | undefined) => void;
}

export default function CodeEditor({ code, onChange }: Props) {
  return (
    <Editor
      height="100%"
      defaultLanguage="python"
      defaultValue={code}
      theme="vs-dark"
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
      }}
      onChange={onChange}
    />
  );
}