from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from supabase import create_client, Client

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://vercel.app", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Environment variables with fallback values
supabase_url = os.environ.get("SUPABASE_URL") or "https://ufvjbfyuzxhtshbgntxy.supabase.co"
supabase_key = os.environ.get("SUPABASE_KEY") or "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmdmpiZnl1enhodHNoYmdudHh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDMyMTMxOSwiZXhwIjoyMDY1ODk3MzE5fQ.INKNul4D6DICmP-xUGqbRziCDoLSTH263NaxgasR86U"

# Debug: Print environment variables (remove in production)
print(f"SUPABASE_URL: {supabase_url}")
print(f"SUPABASE_KEY: {'***' if supabase_key else 'None'}")

if not supabase_url or not supabase_key:
    raise ValueError("SUPABASE_URL and SUPABASE_KEY must be set")

supabase: Client = create_client(supabase_url, supabase_key)

@app.get("/")
async def root():
    return {"message": "Morning Activity API"}

@app.get("/api/test")
async def test():
    return {"message": "API connection successful", "status": "ok"}

@app.get("/api/health")
async def health():
    try:
        response = supabase.table("test_table").select("*").limit(1).execute()
        return {"message": "Database connection successful", "status": "ok", "data": response.data}
    except Exception as e:
        return {"message": "Database connection failed", "status": "error", "error": str(e)}

@app.get("/api/test-data")
async def get_test_data():
    try:
        response = supabase.table("test_table").select("*").execute()
        return {"message": "Test data retrieved successfully", "data": response.data}
    except Exception as e:
        return {"message": "Failed to retrieve test data", "error": str(e)}

@app.post("/api/test-data")
async def create_test_data(name: str, email: str):
    try:
        response = supabase.table("test_table").insert({"name": name, "email": email}).execute()
        return {"message": "Test data created successfully", "data": response.data}
    except Exception as e:
        return {"message": "Failed to create test data", "error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)