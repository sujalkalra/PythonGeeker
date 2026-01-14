from fastapi import APIRouter
from pydantic import BaseModel
import subprocess
import sys
import os

router = APIRouter(prefix="/api")

# WARNING: Set USE_DOCKER=false only for free-tier deployments where Docker is unavailable.
# This mode is less secure as it runs code directly on the host machine.
USE_DOCKER = os.getenv("USE_DOCKER", "true").lower() == "true"

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
        if USE_DOCKER:
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
        else:
            # Fallback: Execute directly using the host's Python interpreter
            # NOTE: This is insecure for public apps but allows free-tier deployment
            cmd = [sys.executable, "-c", full_code]
        
        # 2. Execute with explicit encoding handling
        # encoding="utf-8": Encodes input and decodes output as UTF-8
        # errors="replace": Prevents crashing if invalid bytes are encountered
        # We handle input via pipe for both Docker and direct execution (if using -c, we might need adjustments)
        
        # Correction for direct execution:
        # If running via `python -c code`, we can't easily pipe large code.
        # Instead, we should use `python -` to read from stdin, which matches Docker's behavior.
        if not USE_DOCKER:
             cmd = [sys.executable, "-"]

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
            "stderr": "Execution Environment not found. Please check server configuration.", 
            "returncode": -1
        }
    except Exception as e:
        return {
            "stdout": "", 
            "stderr": f"System Error: {str(e)}", 
            "returncode": -1
        }
