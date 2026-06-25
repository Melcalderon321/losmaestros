import re
import glob

files = glob.glob('*.html')

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Remove active class from size-col
    content = re.sub(r'class="size-col\s+active"', 'class="size-col"', content)
    
    # Remove onclick="selectCardSize(...)"
    content = re.sub(r'\s*onclick="selectCardSize[^"]+"', '', content)
    
    # Replace button
    # Original: <button class="btn-pedir-online btn-buy" onclick="addToCart('...', '...')">PEDIR ONLINE</button>
    # Also need to match variations just in case
    content = re.sub(
        r'<button class="btn-pedir-online[^>]*>PEDIR ONLINE</button>',
        r'<div style="text-align: center; margin-top: 15px; margin-bottom: 5px;"><a href="#productos" class="btn btn-primary"><i class="fa-solid fa-pizza-slice"></i> Pedir online</a></div>',
        content
    )

    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
print("Updated HTML files.")
