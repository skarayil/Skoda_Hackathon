import os

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content
    # Replace ../../../components/ui/ with ../ui/
    new_content = new_content.replace("'../../../components/ui/", "'../ui/")
    new_content = new_content.replace('"../../../components/ui/', '"../ui/')
    
    # Replace ../../../components/common/ with ../common/
    new_content = new_content.replace("'../../../components/common/", "'../common/")
    new_content = new_content.replace('"../../../components/common/', '"../common/')
    
    # Replace ../../../components/charts/ with ../charts/
    new_content = new_content.replace("'../../../components/charts/", "'../charts/")
    new_content = new_content.replace('"../../../components/charts/', '"../charts/')

    # Also handle ../../components/ui if any (e.g. from components/TopBar.tsx but wait, TopBar was moved to layouts)
    new_content = new_content.replace("'../../components/ui/", "'../ui/")
    new_content = new_content.replace('"../../components/ui/', '"../ui/')

    if content != new_content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

def main():
    dirs_to_check = ['frontend/src/components']
    for d in dirs_to_check:
        for root, dirs, files in os.walk(d):
            for file in files:
                if file.endswith('.tsx') or file.endswith('.ts'):
                    process_file(os.path.join(root, file))

if __name__ == '__main__':
    main()
