export async function runPythonCode(code: string) {
  const res = await fetch("http://localhost:8000/api/run", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  if (!res.ok) {
    throw new Error("Failed to run code");
  }

  return res.json();
}