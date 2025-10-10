import os
from dotenv import load_dotenv


current_directory = os.getcwd()+'/secpass/backend'
load_dotenv(os.path.join(current_directory, '.env'))

env = {
    'database_url': os.getenv("DATABASE_URL"),
}