import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content
    # Replace "../src/" with "../"
    new_content = new_content.replace('"../src/', '"../')
    new_content = new_content.replace("'../src/", "'../")
    
    # Replace "./src/" with "./"
    new_content = new_content.replace('"./src/', '"./')
    new_content = new_content.replace("'./src/", "'./")
    
    # Replace components/ to pages/ or layouts/ for specific files
    pages = ["ManagerDashboard", "TeamHeatmap", "EmployeeProfile", "SuccessionReadiness", "HRAnalytics", "AIAssistant", "DataIngestion", "SkillCoachPresentation"]
    layouts = ["Navigation", "TopBar"]
    
    for page in pages:
        new_content = re.sub(r'["\'](.*?)components/' + page + r'["\']', r'"\1pages/' + page + '"', new_content)
    for layout in layouts:
        new_content = re.sub(r'["\'](.*?)components/' + layout + r'["\']', r'"\1layouts/' + layout + '"', new_content)

    if content != new_content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

def main():
    for root, dirs, files in os.walk('frontend/src'):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts') or file.endswith('.jsx') or file.endswith('.js'):
                process_file(os.path.join(root, file))

if __name__ == '__main__':
    main()
