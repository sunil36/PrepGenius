
FROM python:3.12-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

COPY pyproject.toml ./

RUN pip install --no-cache-dir \
    "fastapi>=0.115.0" \
    "uvicorn[standard]>=0.32.0" \
    "pydantic>=2.9.0" \
    "pydantic-settings>=2.5.0" \
    "sqlalchemy>=2.0.35" \
    "asyncmy>=0.2.9" \
    "alembic>=1.13.3" \
    "pymysql"

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
