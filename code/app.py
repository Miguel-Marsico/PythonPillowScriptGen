from flask import Flask, render_template, request, jsonify
import math

app = Flask(__name__)

CM_TO_PX = 37.7952755906  # Conversão de cm para pixels

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_script', methods=['POST'])
def generate_script():
    data = request.json
    script = generate_pillow_script(data)
    return jsonify({'script': script})

def generate_pillow_script(data):
    width = round(float(data['width']) * CM_TO_PX)
    height = round(float(data['height']) * CM_TO_PX)
    elements = data['elements']

    script = f"""from PIL import Image, ImageDraw

image = Image.new('RGB', ({width}, {height}), 'white')
draw = ImageDraw.Draw(image)

"""

    for element in elements:
        element['x'] = round(float(element['x']))
        element['y'] = round(float(element['y']))
        element['width'] = round(float(element.get('width', 0)) * CM_TO_PX)
        element['height'] = round(float(element.get('height', 0)) * CM_TO_PX)
        element['border_width'] = round(float(element.get('border_width', 0)))
        element['length'] = round(float(element.get('length', 0)) * CM_TO_PX)
        element['rotation'] = round(float(element.get('rotation', 0)))
        element['size'] = round(float(element.get('size', 0)))

        if element['type'] == 'text':
            script += f"""
draw.text(({element['x']}, {element['y']}), "{element['text']}", fill="{element['color']}")
"""
        elif element['type'] == 'rectangle':
            script += f"""
draw.rectangle([{element['x']}, {element['y']}, {element['x'] + element['width']}, {element['y'] + element['height']}], outline="{element['color']}", width={element['border_width']})
"""
        elif element['type'] == 'circle':
            script += f"""
draw.ellipse([{element['x']}, {element['y']}, {element['x'] + element['width']}, {element['y'] + element['height']}], outline="{element['color']}", width={element['border_width']})
"""
        elif element['type'] == 'line':
            script += f"""
x2 = {element['x']} + {element['length']} * math.cos(math.radians({element['rotation']}))
y2 = {element['y']} + {element['length']} * math.sin(math.radians({element['rotation']}))
draw.line([{element['x']}, {element['y']}, x2, y2], fill="{element['color']}", width={element['width']})
"""
        elif element['type'] == 'triangle':
            script += f"""
draw.polygon([{element['x']}, {element['y']}, {element['x'] + element['width']}, {element['y']}, {element['x'] + element['width'] / 2}, {element['y'] - element['height']}], outline="{element['color']}", width={element['border_width']})
"""
        # Add more element types as needed.

    script += """
image.show()
"""
    return script

if __name__ == '__main__':
    app.run(debug=True)
