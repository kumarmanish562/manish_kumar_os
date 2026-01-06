from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# --- PORTFOLIO DATA (MOCK) ---
PORTFOLIO_DATA = {
    "home": {
        "name": "Manish Kumar",
        "headline": "Web Developer | React Learner",
        "intro": "Building antigravity web experiences and exploring the frontiers of AI.",
        "buttons": [
            {"label": "View Projects", "action": "navigate", "target": "projects"},
            {"label": "Contact Me", "action": "navigate", "target": "contact"}
        ]
    },
    "about": {
        "bio": "I am a passionate developer with a knack for creating immersive, high-performance web applications. Currently a B.Tech student exploring the intersection of web dev and AI.",
        "skills_summary": "Proficient in React, Python, and modern web technologies. Fast learner and team player.",
        "goal": "To build the operating systems of the web and democratize AI tools."
    },
    "skills": {
        "languages": [
            {"name": "Python", "level": 90},
            {"name": "JavaScript", "level": 85},
            {"name": "Java", "level": 70},
            {"name": "HTML/CSS", "level": 95}
        ],
        "frameworks": [
            {"name": "React", "level": 90},
            {"name": "Node.js", "level": 75},
            {"name": "Express", "level": 75},
            {"name": "Flask", "level": 85},
            {"name": "TailwindCSS", "level": 95}
        ],
        "tools": [
            {"name": "Git & GitHub", "level": 90},
            {"name": "Docker", "level": 75},
            {"name": "AWS", "level": 60}
        ],
        "soft_skills": [
            "Problem Solving", "Team Work", "Communication", "Adaptability"
        ]
    },
    "projects": [
        {
            "id": 1,
            "title": "Depression Detection System",
            "tech_stack": ["React", "Python", "ML", "DASS-21"],
            "description": "An AI-powered system analyzing text and speech patterns to detect early signs of depression.",
            "screenshot": "https://placehold.co/600x400/0d1117/00f3ff?text=Depression+Detection",
            "links": {"github": "https://github.com", "demo": "https://demo.com"}
        },
        {
            "id": 2,
            "title": "Portfolio OS",
            "tech_stack": ["React", "Three.js", "GSAP", "Tailwind v4"],
            "description": "A dual-mode portfolio website featuring a futuristic GUI and a fully functional terminal interface.",
            "screenshot": "https://placehold.co/600x400/0d1117/bc13fe?text=Portfolio+OS",
            "links": {"github": "https://github.com", "demo": "#"}
        }
    ],
    "experience": [
        {
            "role": "Frontend Intern",
            "company": "Tech Startup",
            "date": "Summer 2024",
            "description": "Worked on the main dashboard components. Optimized load times by 20%.",
            "technologies": ["React", "Redux", "Sass"]
        }
    ],
    "education": {
        "degree": "B.Tech in Computer Science",
        "college": "Institute of Technology",
        "year": "2022 - 2026",
        "major": "Computer Science & Engineering",
        "achievements": ["Hackathon Winner 2024", "Dean's List"]
    },
    "certifications": [
        {"title": "Full Stack Web Development", "issuer": "Udemy", "date": "2024"},
        {"title": "Machine Learning Basic", "issuer": "Coursera", "date": "2023"}
    ],
    "resume": {
        "pdf_link": "/resume.pdf",
        "preview_image": "https://placehold.co/600x800/ffff/000000?text=Resume+Preview"
    },
    "contact": {
        "email": "manish@example.com",
        "linkedin": "https://linkedin.com/in/manish",
        "github": "https://github.com/manish",
        "phone": "+91 98765 43210"
    }
}

# --- COMMANDS LOGIC ---
COMMANDS = {
    "help": "Available commands: help, cat [section], ls, gui, clear, whoami, date",
    "ls": "sections: home, about, skills, projects, experience, education, certifications, resume, contact",
    "whoami": "guest_user@portfolio-os",
    "gui": "Switching to GUI mode...",
}

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify(PORTFOLIO_DATA)

@app.route('/api/command', methods=['POST'])
def handle_command():
    data = request.json
    cmd_str = data.get('command', '').strip().lower()
    
    if not cmd_str:
        return jsonify({"output": ""})

    parts = cmd_str.split()
    base_cmd = parts[0]
    args = parts[1:] if len(parts) > 1 else []

    response_text = ""

    if base_cmd == 'cat':
        if not args:
            response_text = "Usage: cat [section_name]"
        else:
            section = args[0]
            if section in PORTFOLIO_DATA:
                # Pretty print json or string representation of the section
                import json
                response_text = json.dumps(PORTFOLIO_DATA[section], indent=2)
            else:
                response_text = f"Error: Section '{section}' not found. Try 'ls'."
    
    elif base_cmd in COMMANDS:
        response_text = COMMANDS[base_cmd]
    
    elif base_cmd == 'date':
        from datetime import datetime
        response_text = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    elif base_cmd == 'exit':
        response_text = "Switching to GUI mode..." # Frontend should handle the switch

    else:
        response_text = f"Command not found: {base_cmd}. Type 'help' for available commands."

    return jsonify({"output": response_text, "command": cmd_str})

if __name__ == '__main__':
    app.run(debug=True, port=5000)