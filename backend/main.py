from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import sqlite3
import os
from dotenv import load_dotenv

load_dotenv()


# Initialize FastAPI app
app = FastAPI(title="Marketing Campaign API")

FRONTEND_URL = os.getenv("FRONTEND_URL")

print("url",FRONTEND_URL)

origins = [
    FRONTEND_URL,  # Add your backend URL
    "http://localhost:5173/",  # React Development URL (Optional, add if needed)
    "http://localhost",   # Allow all localhost origins
    "http://127.0.0.1",
]
# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Database setup
DB_PATH = "campaigns.db"

# Models
class Campaign(BaseModel):
    id: int
    name: str
    status: str
    clicks: int
    cost: float
    impressions: int

class CampaignCreate(BaseModel):
    name: str
    status: str
    clicks: int
    cost: float
    impressions: int

# Initialize database
def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Create campaigns table if it doesn't exist
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS campaigns (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        status TEXT NOT NULL,
        clicks INTEGER NOT NULL,
        cost REAL NOT NULL,
        impressions INTEGER NOT NULL
    )
    ''')
    
    # Check if table is empty and insert sample data if needed
    cursor.execute("SELECT COUNT(*) FROM campaigns")
    count = cursor.fetchone()[0]
    
    if count == 0:
        sample_campaigns = [
            { id: 1, name: "Summer Sale", status: "Active", clicks: 150, cost: 45.99, impressions: 1000 },
    { id: 2, name: "Black Friday", status: "Paused", clicks: 320, cost: 89.50, impressions: 2500 },
    { id: 3, name: "Holiday Special", status: "Active", clicks: 215, cost: 62.25, impressions: 1750 },
    { id: 4, name: "Spring Collection", status: "Active", clicks: 180, cost: 53.75, impressions: 1200 },
    { id: 5, name: "Clearance Event", status: "Paused", clicks: 95, cost: 32.40, impressions: 800 },
    { id: 6, name: "Back to School", status: "Active", clicks: 230, cost: 67.80, impressions: 1900 },
    { id: 7, name: "Winter Sale", status: "Paused", clicks: 175, cost: 49.99, impressions: 1350 },
    { id: 8, name: "New Year Promotion", status: "Active", clicks: 290, cost: 82.15, impressions: 2200 },
    { id: 9, name: "Flash Sale", status: "Paused", clicks: 120, cost: 38.60, impressions: 950 },
    { id: 10, name: "Product Launch", status: "Active", clicks: 350, cost: 95.75, impressions: 2800 }
        ]
        
        cursor.executemany(
            "INSERT INTO campaigns (name, status, clicks, cost, impressions) VALUES (?, ?, ?, ?, ?)",
            sample_campaigns
        )
    
    conn.commit()
    conn.close()

# Initialize the database on startup
init_db()

# API Endpoints

@app.get("/")
async def root():
    return {"message": "Backend is running"}

@app.get("/campaigns", response_model=List[Campaign])
async def get_campaigns(status: Optional[str] = None):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    if status and status in ["Active", "Paused"]:
        cursor.execute("SELECT * FROM campaigns WHERE status = ?", (status,))
    else:
        cursor.execute("SELECT * FROM campaigns")
    
    campaigns = [dict(row) for row in cursor.fetchall()]
    conn.close()
    
    return campaigns

@app.get("/campaigns/{campaign_id}", response_model=Campaign)
async def get_campaign(campaign_id: int):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM campaigns WHERE id = ?", (campaign_id,))
    campaign = cursor.fetchone()
    conn.close()
    
    if campaign is None:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    return dict(campaign)


@app.post("/campaigns", response_model=Campaign)
async def create_campaign(campaign: CampaignCreate):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute(
        "INSERT INTO campaigns (name, status, clicks, cost, impressions) VALUES (?, ?, ?, ?, ?)",
        (campaign.name, campaign.status, campaign.clicks, campaign.cost, campaign.impressions)
    )
    
    campaign_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    # Return the created campaign including its ID
    return {**campaign.dict(), "id": campaign_id}

if __name__ == "__main__":
    import uvicorn

    port = int(os.environ.get("PORT", 8000))  # Railway will assign PORT env var
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)