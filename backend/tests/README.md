# ŠKODA AI Skill Coach - Test Suite

Complete testing suite for the ŠKODA AI Skill Coach backend.

## Quick Start

```bash
# Install dependencies
pip install pytest pytest-asyncio httpx psutil

# Run all tests
pytest tests/ -v

# Run with coverage
pytest tests/ --cov=swx_api --cov-report=xml --cov-report=html

# Run specific category
pytest tests/test_01_ingestion.py -v
```

## Test Structure

```
tests/
├── conftest.py                    # Test infrastructure & fixtures
├── test_01_ingestion.py          # Ingestion tests
├── test_02_ai_modules.py         # AI module tests
├── test_03_database.py           # Database tests
├── test_04_api_endpoints.py      # API endpoint tests
├── test_05_tone_validation.py     # TONE validation tests
├── test_06_pipeline_e2e.py       # E2E pipeline tests
├── test_07_load_testing.py       # Load tests
├── test_08_security.py            # Security tests
├── test_09_documentation.py      # Documentation tests
├── data/                         # Test datasets
│   ├── generate_test_datasets.py
│   ├── e2e_dataset.csv
│   └── load_test_dataset.csv
├── pytest.ini                    # Pytest configuration
├── TEST_REPORT.md                # Detailed test report
└── README.md                     # This file
```

## Test Categories

1. **Ingestion Tests** - CSV, Excel, JSON, TXT, DOCX, malformed files
2. **AI Module Tests** - Mock LLM, real LLM, fallbacks
3. **Database Tests** - CRUD, JSONB, queries, migrations
4. **API Endpoint Tests** - All routes with success/error cases
5. **TONE Validation Tests** - TONE format handling
6. **Pipeline E2E Tests** - Complete workflows (200 employees, 35 skills)
7. **Load Testing** - 2000 employees, 100k records, memory leaks
8. **Security Tests** - PII masking, SQL injection, XSS, etc.
9. **Documentation Tests** - OpenAPI schema validation

## Generate Test Datasets

```bash
cd tests/data
python generate_test_datasets.py
```

## Coverage Report

After running tests with coverage:

```bash
# View HTML report
open htmlcov/index.html

# View XML report (for CI)
cat coverage.xml
```

## CI/CD Integration

The test suite is CI-ready. See `TEST_REPORT.md` for GitHub Actions example.

## Documentation

See `TEST_REPORT.md` for comprehensive documentation.

