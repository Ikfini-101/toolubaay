import os
from PIL import Image

logo_path = r"C:\Users\PC\Documents\TOOLOUBAAY\logo-Toolubaay-without-background.png"

if not os.path.exists(logo_path):
    print(f"Error: Logo file not found at {logo_path}")
    exit(1)

img = Image.open(logo_path)
img = img.convert("RGBA")
pixels = img.getdata()

color_counts = {}
for pixel in pixels:
    r, g, b, a = pixel
    if a < 50:  # Skip transparent/semi-transparent pixels
        continue
    # Keep simple hex representation
    hex_color = f"#{r:02x}{g:02x}{b:02x}"
    color_counts[hex_color] = color_counts.get(hex_color, 0) + 1

# Sort colors by frequency
sorted_colors = sorted(color_counts.items(), key=lambda x: x[1], reverse=True)

print("Dominant colors in logo:")
for color, count in sorted_colors[:15]:
    print(f"Color: {color}, Count: {count}")
