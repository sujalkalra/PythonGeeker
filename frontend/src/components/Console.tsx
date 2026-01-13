interface Props {
  output: string;
}

export default function Console({ output }: Props) {
  return (
    <div className="bg-black text-green-400 p-3 h-full text-sm font-mono overflow-auto rounded-lg">
      {output || "▶ Click Run to see output"}
    </div>
  );
}