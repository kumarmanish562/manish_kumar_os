from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

PORTFOLIO_DATA = {
    "home": {
    "name": "Manish Kumar",
    "headline": "Full Stack Web Developer | React & Node.js | AI/ML Enthusiast",
    "intro": "B.Tech 4rd-year student passionate about building scalable web applications, AI-powered systems, and real-world tech solutions using modern frameworks.",
    "social_handle": "@manishkumar.dev",
    "profile_image": "/profile.jpg",
    "buttons": [
        { "label": "View Projects", "action": "navigate", "target": "/projects" },
        { "label": "Contact Me", "action": "navigate", "target": "/contact" }
    ]
}
,
    "about": {
    "bio": "I am a B.Tech 3rd-year student and a passionate full stack web developer with a strong interest in building practical, user-focused applications. I enjoy working on real-world projects that combine clean UI, efficient backend logic, and modern technologies. Along with web development, I am actively exploring AI and machine learning to solve meaningful problems.",
    
    "skills_summary": "I have hands-on experience with HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, Python, and basic machine learning concepts. I have worked on projects involving AI-based systems, full stack applications, and modern UI design. I am a fast learner, comfortable working in teams, and always eager to improve my technical and problem-solving skills.",
    
    "goal": "My goal is to grow as a software engineer by building scalable web platforms and AI-powered applications that create real impact. I aim to continuously learn new technologies, contribute to innovative projects, and develop solutions that are accessible, efficient, and user-friendly.",
    "stats": {
        "project_count": "20+",
        "experience_level": "LVL 4"
    }
}
,
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
        {"title": "API Fundamentals Student Expert", "issuer": "Postman", "date": "2024", "image": "/assets/certificates/postman.png"},
        {"title": "Cloud Essentials Knowledge Badge Assessment", "issuer": "AWS Training and Certification", "date": "Sep 2024", "image": "/assets/certificates/aws.png"},
        {"title": "Full Stack Development Internship", "issuer": "The Black Threat", "date": "June 2024", "image": "/assets/certificates/internship.png"},
        {"title": "Full Stack Web3 Developer", "issuer": "C# Corner", "date": "2024", "image": "/assets/certificates/web3.png"}
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

@app.route('/')
def home():
    return "Backend is running. Please access the frontend (usually http://localhost:5173) to view the Portfolio OS."

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