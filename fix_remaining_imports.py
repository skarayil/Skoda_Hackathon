import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content
    # Replace ../mappers/ with ../utils/mappers/
    new_content = new_content.replace('"../mappers/', '"../utils/mappers/')
    new_content = new_content.replace("'../mappers/", "'../utils/mappers/")
    
    # Replace ../schemas/ with ../types/schemas/
    new_content = new_content.replace('"../schemas/', '"../types/schemas/')
    new_content = new_content.replace("'../schemas/", "'../types/schemas/")
    
    # Replace ../state/ with ../context/
    new_content = new_content.replace('"../state/', '"../context/')
    new_content = new_content.replace("'../state/", "'../context/")
    
    # Replace ../theme/ with ../styles/theme/
    new_content = new_content.replace('"../theme/', '"../styles/theme/')
    new_content = new_content.replace("'../theme/", "'../styles/theme/")
    
    # Replace ../i18n/ with ../utils/i18n/
    new_content = new_content.replace('"../i18n/', '"../utils/i18n/')
    new_content = new_content.replace("'../i18n/", "'../utils/i18n/")

    if content != new_content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

def main():
    dirs_to_check = ['frontend/src']
    for d in dirs_to_check:
        for root, dirs, files in os.walk(d):
            for file in files:
                if file.endswith('.tsx') or file.endswith('.ts'):
                    process_file(os.path.join(root, file))

if __name__ == '__main__':
    main()
