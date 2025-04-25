from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import sqlite3
import os

# Initialize FastAPI app
app = FastAPI(title="Marketing Campaign API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
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
            ("Summer Sale", "Active", 150, 45.99, 1000),
            ("Black Friday", "Paused", 320, 89.50, 2500),
            ("Holiday Special", "Active", 215, 62.25, 1750),
            ("Spring Collection", "Active", 180, 53.75, 1200),
            ("Clearance Event", "Paused", 95, 32.40, 800),
            ("Back to School", "Active", 230, 67.80, 1900),
            ("Winter Sale", "Paused", 175, 49.99, 1350),
            ("New Year Promotion", "Active", 290, 82.15, 2200),
            ("Flash Sale", "Paused", 120, 38.60, 950),
            ("Product Launch", "Active", 350, 95.75, 2800)
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
