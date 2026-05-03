import os

template_path = r"c:\Users\foodly\omarbinamirproject\sponseey-theme-template.html"
output_dir = r"c:\Users\foodly\omarbinamirproject"

themes = [
    {"name": "Food", "icon": "🍱", "color": "#ff6b6b", "desc": "Taste the best digital recipes."},
    {"name": "Fun", "icon": "🎮", "color": "#feca57", "desc": "Entertainment at the speed of light."},
    {"name": "Knowledgeable", "icon": "🧠", "color": "#48dbfb", "desc": "Expand your brain bandwidth."},
    {"name": "Tech", "icon": "💻", "color": "#1dd1a1", "desc": "Cutting edge tools and news."},
    {"name": "Health", "icon": "🌿", "color": "#54a0ff", "desc": "Peak performance for your body."},
    {"name": "Business", "icon": "📈", "color": "#5f27cd", "desc": "Scaling ideas to the moon."},
    {"name": "Art", "icon": "🎨", "color": "#ff9ff3", "desc": "Visual storytelling redefined."},
    {"name": "Travel", "icon": "✈️", "color": "#00d2d3", "desc": "Explore the global grid."},
    {"name": "Fashion", "icon": "👗", "color": "#ff9f43", "desc": "Couture in the digital age."},
    {"name": "Gaming", "icon": "🕹️", "color": "#ee5253", "desc": "Level up your experience."}
]

with open(template_path, 'r', encoding='utf-8') as f:
    template = f.read()

for theme in themes:
    content = template.replace("{{THEME_NAME}}", theme["name"])
    content = content.replace("{{THEME_ICON}}", theme["icon"])
    content = content.replace("{{THEME_COLOR}}", theme["color"])
    content = content.replace("{{THEME_DESC}}", theme["desc"])
    
    filename = f"sponseey-{theme['name'].lower()}.html"
    with open(os.path.join(output_dir, filename), 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Generated {filename}")
