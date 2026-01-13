# This file is copied into the Docker container
# and serves as the entry point for code execution

# The user code will be mounted as /app/main.py
# This file simply executes the mounted code file

import os
import sys

try:
    # Read and execute the user code file
    with open('/app/main.py', 'r') as f:
        code = f.read()
    
    # Create a local namespace for execution
    local_namespace = {}
    
    # Execute the code
    exec(code, local_namespace, local_namespace)
    
    # If there's any output from print statements, it will go to stdout automatically
    
except Exception as e:
    # Print any exceptions to stderr
    print(f"{type(e).__name__}: {e}", file=sys.stderr)