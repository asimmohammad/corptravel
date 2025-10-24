import os

# Use DATABASE_URL directly from environment, with fallback to individual components
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    # Fallback to individual environment variables
    from urllib.parse import quote_plus
    DB_USER = os.getenv("DB_USER", "laasyadmin")
    DB_PASS = quote_plus(os.getenv("DB_PASS", ""))
    DB_HOST = os.getenv("DB_HOST", "")
    DB_PORT = os.getenv("DB_PORT", "3306")
    DB_NAME = os.getenv("DB_NAME", "devcorptravel")
    DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
