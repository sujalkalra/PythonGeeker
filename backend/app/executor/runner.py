import subprocess
import tempfile
import os
import uuid

def run_python_code(code: str):
    container_name = f"py-run-{uuid.uuid4().hex[:8]}"

    with tempfile.TemporaryDirectory() as tmpdir:
        file_path = os.path.join(tmpdir, "main.py")

        with open(file_path, "w") as f:
            f.write(code)

        try:
            result = subprocess.run(
                [
                    "docker", "run",
                    "--rm",
                    "--name", container_name,
                    "--network", "none",
                    "--memory", "128m",
                    "--cpus", "0.5",
                    "-v", f"{file_path}:/app/main.py",
                    "pythongeeker-runner"
                ],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                timeout=2,
                text=True
            )

            return {
                "stdout": result.stdout,
                "stderr": result.stderr
            }

        except subprocess.TimeoutExpired:
            return {
                "stdout": "",
                "stderr": "Execution timed out (2s limit)"
            }