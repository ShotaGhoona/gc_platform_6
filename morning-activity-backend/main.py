from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from supabase import create_client, Client

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")
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