with open(r'C:\Users\Chien\Desktop\ATG\PRJ\KED\js\images_data.js', 'r', encoding='utf-8') as f:
    content = f.read()

svg_def = '''/**
 * KED - Images Comprehensive Dataset v3.2
 * Tích hợp SVG Vector chuẩn xác cho Chuồn Chuồn & Cá Ngựa
 */

const KED_SVG_ICONS = {
    dragonfly: '<svg viewBox="0 0 64 64" width="1em" height="1em" style="vertical-align:-0.15em;display:inline-block;" xmlns="http://www.w3.org/2000/svg"><path d="M32 14 L32 58" stroke="#0284c7" stroke-width="5" stroke-linecap="round"/><circle cx="32" cy="12" r="6" fill="#38bdf8"/><circle cx="29" cy="11" r="2" fill="#0f172a"/><circle cx="35" cy="11" r="2" fill="#0f172a"/><ellipse cx="18" cy="18" rx="15" ry="5" fill="#67e8f9" fill-opacity="0.85" stroke="#0284c7" stroke-width="1.5" transform="rotate(-20 18 18)"/><ellipse cx="46" cy="18" rx="15" ry="5" fill="#67e8f9" fill-opacity="0.85" stroke="#0284c7" stroke-width="1.5" transform="rotate(20 46 18)"/><ellipse cx="19" cy="27" rx="13" ry="4" fill="#a5f3fc" fill-opacity="0.85" stroke="#0284c7" stroke-width="1.5" transform="rotate(-10 19 27)"/><ellipse cx="45" cy="27" rx="13" ry="4" fill="#a5f3fc" fill-opacity="0.85" stroke="#0284c7" stroke-width="1.5" transform="rotate(10 45 27)"/></svg>',
    seahorse: '<svg viewBox="0 0 64 64" width="1em" height="1em" style="vertical-align:-0.15em;display:inline-block;" xmlns="http://www.w3.org/2000/svg"><path d="M34 10 C27 10 23 15 23 20 C23 24 26 27 29 28 L27 38 C25 43 28 49 33 50 C36 51 37 54 35 57 C32 60 28 58 27 55" fill="none" stroke="#f59e0b" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 19 L15 20 L15 23 L24 23 Z" fill="#f59e0b"/><circle cx="29" cy="16" r="2.5" fill="#1e293b"/><circle cx="30" cy="15.5" r="0.9" fill="#ffffff"/><path d="M38 31 C43 32 43 38 38 41 Z" fill="#fbbf24" stroke="#d97706" stroke-width="1.5"/><path d="M34 9 Q36 5 33 3 Q30 6 30 9 Z" fill="#fbbf24"/></svg>'
};

'''

# Replace header
content = svg_def + content[content.find("const KED_IMAGES_DATA"):]

# Replace dragonfly icon
old_df = '{ id: "dragonfly", cat: "freshwater", name: "Chuồn Chuồn", icon: "🌾"'
new_df = '{ id: "dragonfly", cat: "freshwater", name: "Chuồn Chuồn", icon: KED_SVG_ICONS.dragonfly'
content = content.replace(old_df, new_df)

# Replace seahorse icon
old_sh = '{ id: "seahorse", cat: "ocean", name: "Cá Ngựa", icon: "🌊"'
new_sh = '{ id: "seahorse", cat: "ocean", name: "Cá Ngựa", icon: KED_SVG_ICONS.seahorse'
content = content.replace(old_sh, new_sh)

with open(r'C:\Users\Chien\Desktop\ATG\PRJ\KED\js\images_data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated images_data.js successfully with KED_SVG_ICONS!")
