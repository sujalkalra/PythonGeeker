from fastapi import APIRouter
from pydantic import BaseModel
import subprocess
import sys

router = APIRouter(prefix="/api")

class CodeRequest(BaseModel):
    code: str

@router.post("/run")
def run_code(payload: CodeRequest):
    # 1. Prepend UTF-8 enforcement to the user code
    # This ensures Python inside Docker treats stdout/stderr as UTF-8
    # regardless of the container's locale settings.
    utf8_header = (
        "import sys\n"
        "try:\n"
        "    sys.stdout.reconfigure(encoding='utf-8')\n"
        "    sys.stderr.reconfigure(encoding='utf-8')\n"
        "except Exception:\n"
        "    pass\n\n"
    )
    full_code = utf8_header + payload.code

    try:
        # Use Docker to execute code securely
        cmd = [
            "docker", "run", "--rm", "-i",
            "--network", "none",
            "--memory", "128m",
            "--cpus", "0.5",
            # Ensure Docker passes UTF-8 environment variable (good practice)
            "-e", "PYTHONIOENCODING=utf-8", 
            "python:3.10-slim",
            "python3"
        ]
        
        # 2. Execute with explicit encoding handling
        # encoding="utf-8": Encodes input and decodes output as UTF-8
        # errors="replace": Prevents crashing if invalid bytes are encountered
        proc = subprocess.run(
            cmd,
            input=full_code,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            timeout=10
        )
        
        return {
            "stdout": proc.stdout,
            "stderr": proc.stderr,
            "returncode": proc.returncode
        }
        
    except subprocess.TimeoutExpired:
        return {
            "stdout": "", 
            "stderr": "Execution timed out (10s limit).", 
            "returncode": -1
        }
    except FileNotFoundError:
        return {
            "stdout": "", 
            "stderr": "Docker not found. Please ensure Docker is installed and running.", 
            "returncode": -1
        }
    except Exception as e:
        return {
            "stdout": "", 
            "stderr": f"System Error: {str(e)}", 
            "returncode": -1
        }
