import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content
    # Replace specific paths
    replacements = {
        "swx_api.app.config": "src.config",
        "swx_api.app.models": "src.models",
        "swx_api.app.routes": "src.routes",
        "swx_api.app.schemas": "src.types",
        "swx_api.app.services": "src.services",
        "swx_api.app.utils": "src.utils",
        "swx_api.app.validators": "src.middleware",
        "swx_api.app.repositories": "src.services",
        "swx_api.app.prompts": "src.utils",
        "swx_api.core.config": "src.config",
        "swx_api.core.middleware": "src.middleware",
        "swx_api.core.utils": "src.utils",
        "swx_api.core": "src",
        "swx_api.app": "src",
        "swx_api/core": "src",
        "swx_api/app": "src",
        "swx_api": "src"
    }

    for old, new in replacements.items():
        new_content = new_content.replace(old, new)

    if content != new_content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

def main():
    dirs_to_check = ['backend/src', 'backend/tests', 'backend/scripts']
    for d in dirs_to_check:
        if not os.path.exists(d):
            continue
        for root, dirs, files in os.walk(d):
            for file in files:
                if file.endswith('.py') or file.endswith('.ini') or file.endswith('.sh'):
                    process_file(os.path.join(root, file))
                    
    # Update alembic.ini and pyproject.toml as well
    for f in ['backend/alembic.ini', 'backend/pyproject.toml', 'backend/docker-compose.yml', 'backend/docker-compose.test.yml']:
        if os.path.exists(f):
            process_file(f)

if __name__ == '__main__':
    main()
