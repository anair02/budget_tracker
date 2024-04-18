from sqlalchemy import create_engine

# Replace the placeholders with your actual database credentials
engine = create_engine('mysql+pymysql://root:password@host.docker.internal/mydatabase')