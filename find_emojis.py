import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

DATA_FILE = r"C:\Users\Chien\Desktop\ATG\PRJ\KED\js\images_data.js"
with open(DATA_FILE, 'r', encoding='utf-8') as f:
    text = f.read()

pattern = r'id:\s*["\']([^"\']+)["\'],\s*cat:\s*["\']([^"\']+)["\'],\s*name:\s*["\']([^"\']+)["\'],\s*icon:\s*["\']([^"\']+)["\']'
items = re.findall(pattern, text)

print(f"Total items inspected: {len(items)}")
for item_id, cat, name, icon in items:
    print(f"[{cat:12}] {name:20} ({item_id:15}) -> {icon}")
