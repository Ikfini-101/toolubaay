import os
import re
import sys
from PIL import Image

# Ensure we have pillow-avif-plugin or install it
try:
    import pillow_avif
except ImportError:
    print("pillow-avif-plugin not found. Attempting to install...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow-avif-plugin"])
    import pillow_avif

photo_dir = r"C:\Users\PC\Documents\TOOLOUBAAY\PHOTO"
dest_dir = r"C:\Users\PC\Documents\TOOLOUBAAY\toolubaay_workspace\src\images\carousel"

os.makedirs(dest_dir, exist_ok=True)

# Clean name function
def clean_filename(name):
    # Remove accents
    import unicodedata
    name = unicodedata.normalize('NFKD', name).encode('ascii', 'ignore').decode('ascii')
    # Lowercase and replace non-alphanumeric with underscores
    name = name.lower()
    name = re.sub(r'[^a-z0-9]+', '_', name)
    # Remove leading/trailing underscores
    name = name.strip('_')
    return name

print(f"Reading from {photo_dir}...")
converted_files = []

for filename in os.listdir(photo_dir):
    if not filename.lower().endswith(('.jpeg', '.jpg', '.png')):
        continue
    
    src_path = os.path.join(photo_dir, filename)
    clean_name = clean_filename(os.path.splitext(filename)[0]) + ".avif"
    dest_path = os.path.join(dest_dir, clean_name)
    
    try:
        with Image.open(src_path) as img:
            # Resize height to 250px, keep aspect ratio
            aspect_ratio = img.width / img.height
            new_height = 250
            new_width = int(new_height * aspect_ratio)
            
            resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # Save as avif
            resized_img.save(dest_path, "AVIF", quality=85)
            print(f"Converted {filename} -> {clean_name} ({new_width}x{new_height})")
            converted_files.append(clean_name)
    except Exception as e:
        print(f"Error converting {filename}: {e}")

print(f"Conversion complete! Converted {len(converted_files)} files.")
