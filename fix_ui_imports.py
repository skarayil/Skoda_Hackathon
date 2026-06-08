import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content
    # Replace import from "./ui/..." with "../components/ui/..."
    new_content = new_content.replace('"./ui/', '"../components/ui/')
    new_content = new_content.replace("'./ui/", "'../components/ui/")
    
    # Replace import from "./common/..." with "../components/common/..."
    new_content = new_content.replace('"./common/', '"../components/common/')
    new_content = new_content.replace("'./common/", "'../components/common/")
    
    # Replace import from "./charts/..." with "../components/charts/..."
    new_content = new_content.replace('"./charts/', '"../components/charts/')
    new_content = new_content.replace("'./charts/", "'../components/charts/")

    if content != new_content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

def main():
    dirs_to_check = ['frontend/src/pages', 'frontend/src/layouts']
    for d in dirs_to_check:
        for root, dirs, files in os.walk(d):
            for file in files:
                if file.endswith('.tsx') or file.endswith('.ts'):
                    process_file(os.path.join(root, file))

if __name__ == '__main__':
    main()
