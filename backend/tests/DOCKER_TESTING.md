# Running Tests in Docker Containers

This guide explains how to run the complete test suite in Docker containers.

## Quick Start

```bash
# From project root
docker-compose -f docker-compose.test.yml up --build
```

## Docker Test Setup

The test suite runs in isolated Docker containers with:

- **Test Database**: PostgreSQL 15 (separate from production DB)
- **Test Runner**: Python 3.10 with all test dependencies
- **Isolated Environment**: No interference with production services

## Files

- `Dockerfile.test` - Test container image
- `docker-compose.test.yml` - Test orchestration
- `scripts/run_tests_docker.sh` - Convenience script

## Running Tests

### Full Test Suite

```bash
# Build and run all tests
docker-compose -f docker-compose.test.yml up --build

# Run in background and view logs
docker-compose -f docker-compose.test.yml up --build -d
docker-compose -f docker-compose.test.yml logs -f test-runner
```

### Specific Test Categories

```bash
# Ingestion tests only
docker-compose -f docker-compose.test.yml run --rm test-runner pytest tests/test_01_ingestion.py -v

# Security tests only
docker-compose -f docker-compose.test.yml run --rm test-runner pytest tests/test_08_security.py -v

# E2E tests only
docker-compose -f docker-compose.test.yml run --rm test-runner pytest tests/test_06_pipeline_e2e.py -v
```

### With Coverage

```bash
docker-compose -f docker-compose.test.yml run --rm test-runner \
  pytest tests/ --cov=swx_api --cov-report=xml --cov-report=html --cov-report=term
```

### Test Results

Test results are stored in Docker volume `test-results`:

```bash
# View test results
docker-compose -f docker-compose.test.yml run --rm test-runner cat /app/test-results/junit.xml

# Copy results to host
docker cp test-runner:/app/test-results ./backend/test-results
```

## Environment Variables

You can override test environment variables:

```bash
# Set LLM API key for real LLM tests
FEATHERLESS_API_KEY=your_key docker-compose -f docker-compose.test.yml up

# Enable TONE format
USE_TONE=true docker-compose -f docker-compose.test.yml up
```

## Database Configuration

The test database uses:
- **Host**: `test-db` (internal Docker network)
- **Port**: `5432` (internal), `5433` (host)
- **User**: `test_user`
- **Password**: `test_password`
- **Database**: `test_db`

## Troubleshooting

### Tests Fail to Connect to Database

```bash
# Check database is healthy
docker-compose -f docker-compose.test.yml ps test-db

# View database logs
docker-compose -f docker-compose.test.yml logs test-db
```

### Clean Up

```bash
# Stop and remove containers
docker-compose -f docker-compose.test.yml down

# Remove volumes (clean database)
docker-compose -f docker-compose.test.yml down -v
```

### Rebuild Test Image

```bash
# Force rebuild
docker-compose -f docker-compose.test.yml build --no-cache test-runner
```

## CI/CD Integration

The Docker test setup is CI-ready. Example GitHub Actions:

```yaml
name: Docker Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests in Docker
        run: |
          docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit
      - name: Upload test results
        uses: actions/upload-artifact@v2
        if: always()
        with:
          name: test-results
          path: backend/test-results/
```

## Benefits of Docker Testing

✅ **Isolated Environment**: No conflicts with local setup  
✅ **Consistent Results**: Same environment every time  
✅ **Easy CI/CD**: Same setup locally and in CI  
✅ **Database Isolation**: Separate test database  
✅ **Reproducible**: Exact dependencies every run  

