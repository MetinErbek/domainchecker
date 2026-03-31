# Domain Checker

React + FastAPI project to check domain availability (`.com`, `.net`, `.io`) in real-time with file-based caching.

## Features

- Instant search with debounce (400ms)
- ✅ Available / ❌ Taken domains
- File-based cache for faster repeated queries
- React frontend + FastAPI backend in one project

## Run

```bash
# Install backend requirements
cd backend
pip install -r requirements.txt
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..

# Run both backend + frontend together
npm install -g concurrently      # if not installed globally
npm run dev                      # runs frontend + backend concurrently