# Python Pillow Script Generator

![PillowScriptGen github ‐ Feito com o Clipchamp](https://github.com/Miguel-Marsico/Customer-Service-ChatBot/assets/158609724/ab84c031-3796-4259-a17b-2a50d818053b)

Tutorial in Portuguese: [Youtube Link](https://www.youtube.com/watch?v=Urktgr6w1C0&t=5s)

## 📋 Topics
<div>
 • <a href="#-about">About</a> </br>
 • <a href="#-tools">Tools</a> </br>
 • <a href="#-project-structure">Project structure</a> </br>
 • <a href="#-how-to-execute-the-project">How to execute the project</a> </br>
 • <a href="#-license">License</a></br>
</div>

## 📗 About

**Pillow Script Generator** is a web application that allows users to create custom images and generate **Python scripts for the Pillow library** to recreate these images programmatically. This tool is perfect for **developers** who want to automate image creation with precise specifications.

## 🔧 Tools

### 💻 **Website** ( HTML + CSS + JavaScript )

- [Google Fonts](https://fonts.googleapis.com/css2?family=Gabarito:wght@400;500;600;700;800;900&display=swap)
- [Font Awesome](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.cs)

### 🔄 **API** ([Pyhton](https://www.python.org))

- [Flask](https://flask.palletsprojects.com/en/3.0.x/)
- [Pillow](https://pillow.readthedocs.io/en/stable/)

### 🛠️ **Utilities** 

- Compilers: **[Pycharm Community](https://www.jetbrains.com/pt-br/pycharm/)** 

## 📂 Project structure
Structuring the project with dedicated directories for templates and static files is essential for Flask to correctly identify and render the application components. Placing HTML files in the templates directory allows Flask to use the Jinja2 templating system to generate dynamic pages.

    project/
    │
    ├── app.py
    ├── static/
    │   ├── script.js
    ├── templates/
    │   └── index.html

- app.py: Flask server that defines routes and backend logic, including generating image scripts with Pillow.
- static/script.js: Frontend logic in JavaScript for manipulating the canvas and user interaction.
- templates/index.html: HTML user interface with controls for adding and manipulating elements on the canvas.

    
## ▶ How to execute the project

### The project is divided into **2** parts:

 - 🌐 **Frontend** (WebSite HTML, JavaScript)
 - ⚙️ **Backend** (Python API)
 
 💡 In this case, when running the API, the frontend will work normally on port 5000 of your localhost
 
 💡 Using a Python virtual environment (venv) is essential to isolate and manage project dependencies in a secure and reproducible manner.

### ⚙️ Backend:

#### Create a venv:

1 - Navigate to the directory where you want to create the virtual environment:
```bash
 cd /path/to/your/project
```
2 - Create virtual environment:
```bash
 python3 -m venv name
```
3 - activate the virtual environment:
```bash
 name\Scripts\activate
```


#### Installing libraries:

```bash
 $ pip install Flask
```
```bash
 $ pip install pillow
``` 
#### Library import:

```bash
  from flask import Flask, render_template, request, jsonify
  import math
```

#### Run the app.py file and enter port 5000 on your localhost, which Flask makes available for viewing the application

## 📜 License

### This project is under the MIT license. 
<br>
Developed by Miguel Marsico 👋🏻
