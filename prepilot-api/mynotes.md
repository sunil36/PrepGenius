#############Docker
docker --version
docker compose build
docker compose ps

docker compose build frontend
docker compose logs -f backend
docker compose up -d mysql backend
cd e:\PrepGenius
docker compose up backend

****************ADD migration flow **********************
first need to run pip install alembic sqlalchemy pymysql 
