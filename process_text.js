const fs = require('fs');

function processText() {
    const text = fs.readFileSync('user_text.txt', 'utf-8');

    let startIdx = text.indexOf('Ch 19:');
    startIdx = text.indexOf('Ch 1: In a Luscious Garden', startIdx);
    
    if (startIdx === -1) {
        startIdx = text.indexOf('Ch 1: In a Luscious Garden');
    }
    
    const contentText = text.substring(startIdx);
    
    const pattern = /^(Ch \d+:.*?)$/gm;
    const parts = contentText.split(pattern);
    
    const chapters = [];
    
    for (let i = 1; i < parts.length; i += 2) {
        const title = parts[i].trim();
        const body = parts[i+1].trim();
        
        const paragraphs = body.split('\n');
        let htmlBody = "";
        for (let p of paragraphs) {
            p = p.trim();
            if (p) {
                htmlBody += `<p>${p}</p>\n`;
            }
        }
        
        chapters.push({
            title: title,
            content: htmlBody
        });
    }

    let jsCode = "[\n";
    for (const chap of chapters) {
        jsCode += `            {\n`;
        jsCode += `                title: ${JSON.stringify(chap.title)},\n`;
        jsCode += `                content: \`${chap.content.replace(/`/g, '\\`')}\`\n`;
        jsCode += `            },\n`;
    }
    jsCode += "        ]";
    
    fs.writeFileSync('js_chapters.txt', jsCode, 'utf-8');
}

processText();
