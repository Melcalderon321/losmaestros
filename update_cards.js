const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf-8');
    
    // Remove active class
    content = content.replace(/class="size-col\s+active"/g, 'class="size-col"');
    
    // Remove onclick="selectCardSize(...)"
    content = content.replace(/\s*onclick="selectCardSize[^"]+"/g, '');
    
    // Replace button
    content = content.replace(
        /<button class="btn-pedir-online[^>]*>PEDIR ONLINE<\/button>/g,
        '<div style="text-align: center; margin-top: 15px; margin-bottom: 5px;"><a href="#productos" class="btn btn-primary"><i class="fa-solid fa-pizza-slice"></i> Pedir online</a></div>'
    );
    
    fs.writeFileSync(f, content, 'utf-8');
});
console.log("Updated HTML files.");
