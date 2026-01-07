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
        { "name": "HTML", "level": 95, "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { "name": "CSS", "level": 95, "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { "name": "JavaScript", "level": 88, "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { "name": "Python", "level": 85, "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { "name": "Java (Basics)", "level": 70, "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" }
    ],
    "frameworks": [
        { "name": "React.js", "level": 90, "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { "name": "Node.js", "level": 80, "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { "name": "Express.js", "level": 80, "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { "name": "Tailwind CSS", "level": 95, "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
        { "name": "Flask", "level": 75, "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" }
    ],
    "databases": [
        { "name": "MongoDB", "level": 80, "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" }
    ],
    "tools": [
        { "name": "Git & GitHub", "level": 90, "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { "name": "Docker (Basics)", "level": 70, "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { "name": "AWS (Basics)", "level": 65, "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
        { "name": "Figma (UI Basics)", "level": 65, "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" }
    ],
    "soft_skills": [
        { "name": "Problem Solving", "level": 98 },
        { "name": "Team Collaboration", "level": 95 },
        { "name": "Clear Communication", "level": 90 },
        { "name": "Fast Learning", "level": 92 },
        { "name": "Adaptability", "level": 95 }
    ]
}
,
    "projects": [
        {
            "id": 1,
            "title": "SnapBasket Online Grocery Store",
            "tech_stack": ["React", "Tailwind CSS", "Vite", "React Router DOM", "React Icons", "React Context"],
            "description": "A modern React-based online grocery shopping platform featuring comprehensive user authentication, dynamic shopping cart functionality, and fully responsive design. Built with Tailwind CSS and Vite, this e-commerce application showcases over 100 high-quality product images across multiple categories including fresh produce, premium cheeses, artisan breads, and gourmet treats. Key features include protected routes, persistent cart state management, real-time price calculations, contact support system, and seamless mobile optimization. The application demonstrates modern web development practices with React Context for state management, JWT authentication, and intuitive user experience design.",
            "screenshot": "/assets/projects/SnapBasket-Preview.png",
            "links": {"github": "https://github.com/kumarmanish562/SnapBasket.git", "demo": "https://snap-basket-6kwc.vercel.app/"}
        },
        {
            "id": 2,
            "title": "VR World Metaverse",
            "tech_stack": ["React", "Tailwind CSS", "Vite", "AOS Animation", "React Icons"],
            "description": "An immersive metaverse platform built with React and Tailwind CSS. This responsive web application features interactive UI elements, animated transitions, and a sleek design that introduces users to virtual reality experiences. Key features include animated hero sections, feature showcases, video demos via popup player, app store integration, and a full dark mode experience. The custom gradient effects and smooth animations create an engaging user experience that highlights the possibilities of VR technology.",
            "screenshot": "/assets/projects/VR-World.png",
            "links": {"github": "https://github.com/kumarmanish562/gamer_platform.git", "demo": "https://kumarmanish562.github.io/gamer_platform/"}
        },
        {
            "id": 3,
            "title": "BiblioStore Web",
            "tech_stack": ["React", "Tailwind", "Redux", "Heroicons"],
            "description": "BiblioStore_Web is a sleek and responsive online bookstore built using React, TailwindCSS, Redux, and Heroicons. It offers features like book browsing by category, real-time search, detailed book previews, and a shopping cart. Users can register and log in securely, manage their wishlist, and check out with form validation. After purchasing, users can view their order history. Bilil makes discovering and purchasing books convenient and enjoyable with its minimal yet powerful UI.",
            "screenshot": "/assets/projects/bibil.png",
            "links": {"github": "https://github.com/Code-Mars/Bilil/", "demo": "https://code-mars.github.io/Bilil/"}
        },
        {
            "id": 4,
            "title": "AnMa-Academy",
            "tech_stack": ["React", "Tailwind", "Heroicons", "HeadlessUI"],
            "description": "AnMa-Academy is a responsive and modern frontend for an online learning platform built with React, TailwindCSS, and HeadlessUI. It enables users to explore courses, view instructor profiles, watch preview lectures, and register or log in for a personalized learning experience. The clean UI components, dynamic course cards, and responsive layouts provide a seamless experience on all devices.",
            "screenshot": "/assets/projects/AnMa-Academy.png",
            "links": {"github": "https://github.com/kumarmanish562/AnMa-Academy.git", "demo": "https://kumarmanish562.github.io/AnMa-Academy/"}
        },
        {
            "id": 5,
            "title": "MGaming",
            "tech_stack": ["React", "Vite", "Tailwind CSS", "Heroicons", "SwiperJS", "GSAP"],
            "description": "MGaming is a next-generation, fully responsive gaming website built with React, Vite, and TailwindCSS. It features trending games, gameplay trailers, user reviews, and upcoming releases. Users can browse by genre, explore featured titles, and enjoy an immersive UI with smooth animations, image sliders, and interactive effects powered by SwiperJS and GSAP.",
            "screenshot": "/assets/projects/game.png",
            "links": {"github": "https://github.com/kumarmanish562/MGaming.git", "demo": "https://kumarmanish562.github.io/MGaming/"}
        },
        {
            "id": 6,
            "title": "Disney+ Hotstar Clone",
            "tech_stack": ["React", "Vite", "Tailwind CSS", "React Router", "Axios"],
            "description": "A modern, responsive streaming platform clone built with React, Vite, and Tailwind CSS. This project replicates the Disney+ Hotstar experience with movie and show listings, authentication, and a sleek animated UI. Features include responsive design for all devices, animated banners, interactive cards, user authentication, dynamic routing, and a dark theme inspired by Disney+. The modular component structure makes it easy to customize and extend.",
            "screenshot": "/assets/projects/disney.png",
            "links": {"github": "https://github.com/kumarmanish562/disney_clone_frontend.git", "demo": "https://disney-clone-frontend-zeta.vercel.app/"}
        },
        {
            "id": 7,
            "title": "FigmaLand - Modern Landing Page",
            "tech_stack": ["HTML5", "CSS3", "JavaScript", "CSS Grid", "Flexbox", "Responsive Design"],
            "description": "A modern, responsive landing page built with vanilla HTML5, CSS3, and JavaScript. This project showcases a clean, professional design tool website with interactive features, smooth animations, and mobile-first approach. Features include responsive navigation, custom video player, testimonial carousel, contact form validation, partner showcase, and pricing plans. The semantic HTML structure, CSS Grid/Flexbox layouts, and ES6+ JavaScript demonstrate modern web development best practices.",
            "screenshot": "/assets/projects/figmaland.png",
            "links": {"github": "https://github.com/kumarmanish562/figmaLand.git", "demo": "https://figma-land-lilac.vercel.app/"}
        }
    ],
    "experience": [
        {
            "role": "Frontend Development Intern",
            "company": "The Black Threat",
            "date": "Dec 2023 - Jun 2024",
            "description": "During my internship, I focused on building modern and responsive web interfaces using React.js and Tailwind CSS. I collaborated on real-world projects, improved user experiences, and followed best practices in frontend development. The experience strengthened my skills in component-based design, state management, and API integration.",
            "technologies": ["React.js", "Tailwind CSS", "JavaScript", "HTML", "CSS", "Git", "Responsive Design"]
        }
    ],
    "education": [
        {
            "id": 1,
            "degree": "B.Tech in Computer Science (AI & ML)",
            "college": "Rungta College of Engineering & Technology, Bhilai",
            "year": "2022 - 2026",
            "desc": "Affiliated to CSVTU. Specialization in Artificial Intelligence & Machine Learning.",
            "achievements": ["Hackathon Winner 2024", "Dean's List"]
        },
        {
            "id": 2,
            "degree": "Intermediate (Class XII)",
            "college": "Jagdam College, Chapra",
            "year": "2019 - 2021",
            "desc": "Science Stream (PCM) | Bihar School Examination Board",
            "achievements": ["Score: 376/500", "1st Division"]
        },
        {
            "id": 3,
            "degree": "Matriculation (Class X)",
            "college": "Mishra Vidhya Mandir, Ludhiana",
            "year": "2018 - 2019",
            "desc": "Standard X | Punjab School Education Board",
            "achievements": ["Score: 562/650", "Result: Pass"]
        }
    ],
    "certifications": [
        {"title": "API Fundamentals Student Expert", "issuer": "Postman", "date": "2024", "image": "/assets/certificates/postman.png"},
        {"title": "Cloud Essentials Knowledge Badge Assessment", "issuer": "AWS Training and Certification", "date": "Sep 2024", "image": "/assets/certificates/aws.png"},
        {"title": "Full Stack Development Internship", "issuer": "The Black Threat", "date": "June 2024", "image": "/assets/certificates/internship.png"},
        {"title": "Full Stack Web3 Developer", "issuer": "C# Corner", "date": "2024", "image": "/assets/certificates/web3.png"}
    ],
    "resume": {
        "pdf_link": "/assets/Manish_Kumar_AIML.pdf.pdf",
        "preview_image": "https://placehold.co/600x800/ffff/000000?text=Resume+Preview"
    },
    "contact": {
        "email": "kumar.manish.in.0328@gmail.com",
        "linkedin": "https://linkedin.com/in/kumarmanish562",
        "github": "https://github.com/kumarmanish562",
        "phone": "+91 9334170932"
    }
}

# --- COMMANDS LOGIC ---
COMMANDS = {
    "help": "Available commands: help, cat [section], ls, gui, clear, whoami, date",
    "ls": "sections: home, about, skills, projects, experience, education, certifications, resume, contact",
    "whoami": "manish kumar",
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