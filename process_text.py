import re
import json

def process():
    with open('user_text.txt', 'r', encoding='utf-8') as f:
        text = f.read()

    # Find where the chapters start (after "Contents: ... Ch 19: ...")
    start_idx = text.find('Ch 1: In a Luscious Garden', text.find('Ch 19:'))
    
    if start_idx == -1:
        # Fallback
        start_idx = text.find('Ch 1: In a Luscious Garden')
        
    # The actual content to parse
    content_text = text[start_idx:]
    
    # Split by chapters
    # We look for "Ch X: Title\n"
    pattern = re.compile(r'^(Ch \d+:.*?)$', re.MULTILINE)
    
    parts = pattern.split(content_text)
    
    chapters = []
    
    for i in range(1, len(parts), 2):
        title = parts[i].strip()
        body = parts[i+1].strip()
        
        # Split body into paragraphs
        paragraphs = body.split('\n')
        html_body = ""
        for p in paragraphs:
            p = p.strip()
            if p:
                html_body += f"<p>{p}</p>\n"
                
        chapters.append({
            "title": title,
            "content": html_body
        })

    # Now, let's output this into a JS array format
    js_code = "[\n"
    for chap in chapters:
        js_code += f"            {{\n"
        js_code += f"                title: {json.dumps(chap['title'])},\n"
        js_code += f"                content: `{chap['content']}`\n"
        js_code += f"            }},\n"
    js_code += "        ]"
    
    with open('js_chapters.txt', 'w', encoding='utf-8') as f:
        f.write(js_code)

if __name__ == "__main__":
    process()
