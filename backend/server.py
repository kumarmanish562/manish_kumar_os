from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# --- YOUR PERSONAL DATA STORE ---
DATA = {
    "about": {
        "type": "text",
        "content": "Hello! I am Manish Kumar.\nI am a Full Stack Developer & Cloud Enthusiast.\nI build AI-powered applications and secure cloud architectures."
    },
    "skills": {
        "type": "tags",
        "title": "Technical Arsenal",
        "content": [
            "Python", "Java", "React.js", "Flask", "Django", 
            "Oracle Cloud (OCI)", "GenAI", "Machine Learning", "Docker"
        ]
    },
    "projects": {
        "type": "grid",
        "content": [
            {
                "title": "AI Threat Alert System",
                "tech": ["Python", "ML", "Cybersecurity"],
                "desc": "An automated system detecting cyber threats in real-time using Generative AI.",
                "link": "#"
            },
            {
                "title": "Dev Chronicles",
                "tech": ["Django", "PostgreSQL", "React"],
                "desc": "A full-featured blog platform for developers to share code snippets.",
                "link": "#"
            },
            {
                "title": "Nagar Alert Hub",
                "tech": ["Firebase", "React Native", "Maps API"],
                "desc": "A mobile app for reporting city issues directly to administration.",
                "link": "#"
            },
             {
                "title": "Depression Detection",
                "tech": ["Python", "NLP", "TensorFlow"],
                "desc": "Analyzing text patterns to predict early signs of depression.",
                "link": "#"
            }
        ]
    },
    "experience": {
        "type": "timeline",
        "title": "Professional Journey",
        "content": [
            {
                "role": "Hackathon Participant",
                "company": "Innerve 2026",
                "date": "2025 - Present",
                "desc": "Building innovative AI solutions for smart city management."
            },
            {
                "role": "Full Stack Developer Intern",
                "company": "Tech Solutions Inc.",
                "date": "2024 - 2025",
                "desc": "Developed microservices using Flask and optimized OCI cloud deployments."
            }
        ]
    },
    "education": {
        "type": "timeline",
        "title": "Academic Background",
        "content": [
            {
                "role": "B.Tech in Computer Science",
                "company": "University of Technology",
                "date": "2023 - 2027",
                "desc": "Specializing in AI/ML and Cloud Computing."
            }
        ]
    },
    "certifications": {
        "type": "list",
        "content": [
            "Oracle Cloud Infrastructure Foundations Associate",
            "Google Cybersecurity Professional Certificate",
            "AWS Certified Cloud Practitioner"
        ]
    },
    "contact": {
        "type": "contact_card",
        "content": {
            "email": "manish@example.com",
            "github": "github.com/manish",
            "linkedin": "linkedin.com/in/manish"
        }
    }
}

@app.route('/execute', methods=['POST'])
def execute_command():
    data = request.json
    cmd = data.get('command', '').lower().strip()
    
    if cmd in DATA:
        return jsonify(DATA[cmd])
    elif cmd == "help":
        return jsonify({
            "type": "help",
            "content": list(DATA.keys()) + ["clear"]
        })
    elif cmd == "clear":
        return jsonify({"type": "clear"})
    else:
        return jsonify({
            "type": "error", 
            "content": f"Command '{cmd}' not found. Type 'help'."
        })

if __name__ == '__main__':
    app.run(debug=True, port=5000)