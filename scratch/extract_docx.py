import docx
import sys

def extract_text(filename):
    try:
        doc = docx.Document(filename)
        text = "\n".join([para.text for para in doc.paragraphs if para.text.strip()])
        print(f"Extracted {len(text)} characters from {filename}")
        
        # Search for address keywords
        for line in text.split('\n'):
            if 'adresse' in line.lower() or 'dakar' in line.lower() or 'tambacounda' in line.lower() or 'bp ' in line.lower():
                print("POSSIBLE ADDRESS:", line)
                
        # Search for faq keywords
        print("\n--- FAQ SEARCH ---")
        lines = text.split('\n')
        for i, line in enumerate(lines):
            if '?' in line or 'faq' in line.lower() or 'question' in line.lower():
                print(f"L{i}: {line}")
                
    except Exception as e:
        print(f"Error reading {filename}: {e}")

extract_text(sys.argv[1])
