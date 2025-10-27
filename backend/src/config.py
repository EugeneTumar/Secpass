import os
from dotenv import load_dotenv

current_directory = os.path.dirname(__file__)
load_dotenv(os.path.join(current_directory, '.env'))

env = {
    'database_url': os.getenv("DATABASE_URL"),
}