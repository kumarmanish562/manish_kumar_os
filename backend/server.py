from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

PORTFOLIO_DATA = {
    "home": {
    "name": "Manish Kumar",
    "headline": "Full Stack Web Developer | React & Node.js | AI/ML Enthusiast",
    "intro": "B.Tech 4th-year student passionate about building scalable web applications, AI-powered systems, and real-world tech solutions using modern frameworks. Three-time National Hackathon Finalist and 1-time First Place Hackathon Winner.",
    "social_handle": "@kumarmanish562",
    "profile_image": "/profile.jpg",
    "buttons": [
        { "label": "View Projects", "action": "navigate", "target": "/projects" },
        { "label": "Contact Me", "action": "navigate", "target": "/contact" }
    ]
}
,
    "about": {
    "bio": "I am a B.Tech 4th-year student and a passionate full stack web developer with a strong interest in building practical, user-focused applications. I enjoy working on real-world projects that combine clean UI, efficient backend logic, and modern technologies. Along with web development, I am actively exploring AI and machine learning to solve meaningful problems.",
    
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
        "preview_image": "/assets/Manish_Kumar_AIML.pdf.pdf"
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
    "help": "Available commands:\n\nabout          - Information about me\ncertification  - My professional certifications\ncontact        - How to reach me\neducation      - My educational background\nexperience     - My work experience\nhome           - Portfolio home screen\nprojects       - My technical projects\nresume         - Link to my resume\nskill          - My technical skills\nclear          - Clear the terminal screen\nexit           - Exit to GUI mode",
    "ls": "sections: home, about, skills, projects, experience, education, certifications, resume, contact",
    "whoami": "manish kumar",
    "gui": "Switching to GUI mode...",
}

@app.route('/')
def home():
    return """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Portfolio OS | Backend</title>
        <style>
            body {
                background-color: #030712;
                color: #e2e8f0;
                font-family: 'Courier New', Courier, monospace;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
            }
            .container {
                text-align: center;
                border: 1px solid #1e293b;
                padding: 2rem;
                border-radius: 1rem;
                background: rgba(30, 41, 59, 0.5);
                backdrop-filter: blur(10px);
                box-shadow: 0 0 20px rgba(0, 243, 255, 0.1);
            }
            h1 { color: #00f3ff; margin-bottom: 1rem; }
            p { color: #94a3b8; margin-bottom: 2rem; }
            .status {
                display: inline-block;
                padding: 0.25rem 0.75rem;
                border-radius: 9999px;
                background: rgba(34, 197, 94, 0.1);
                color: #4ade80;
                font-size: 0.875rem;
                border: 1px solid rgba(34, 197, 94, 0.2);
            }
            a {
                color: #38bdf8;
                text-decoration: none;
                border-bottom: 1px dashed #38bdf8;
            }
            a:hover { color: #0ea5e9; border-bottom-style: solid; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>SYSTEM_CORE :: ONLINE</h1>
            <p>The backend API servers are operational.</p>
            <div class="status">STATUS: RATED_EXCELLENT</div>
            <br/><br/>
            <p>Access the frontend interface at: <a href="http://localhost:5173">http://localhost:5173</a></p>
        </div>
    </body>
    </html>
    """

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
    # Helper to format data nicely with alignment
    def format_data(d, indent=0, use_extra_spacing=False, ignore_keys=None):
        if ignore_keys is None:
            ignore_keys = []
            
        res = ""
        spacing = " " * indent
        
        if isinstance(d, dict):
            # Calculate max key length for alignment of simple values
            simple_keys = [k.replace('_', ' ').upper() for k, v in d.items() 
                          if not isinstance(v, (dict, list)) and k.lower() not in ignore_keys]
            max_len = max((len(k) for k in simple_keys), default=0)
            
            for k, v in d.items():
                if k.lower() in ignore_keys:
                    continue
                    
                key_str = k.replace('_', ' ').upper()
                
                if isinstance(v, (dict, list)):
                    # Nested structures get their own block (no padding needed on the header usually)
                    # Use standard spacing (False) for nested items unless we decide otherwise
                    res += f"{spacing}{key_str}:\n{format_data(v, indent + 2, use_extra_spacing, ignore_keys)}\n"
                else:
                    # Simple Value: Pad the key to align colons
                    padding = " " * (max_len - len(key_str))
                    # Apply extra newline only if requested (e.g. for 'about' section)
                    suffix = "\n\n" if use_extra_spacing else "\n"
                    res += f"{spacing}{key_str}:{padding}   {v}{suffix}"
        
        elif isinstance(d, list):
            for item in d:
                if isinstance(item, dict):
                    res += f"{spacing}{'-'*40}\n"
                    # For list items (like certifications), we typically want compact lines inside the item
                    res += format_data(item, indent, False, ignore_keys)
                else:
                    res += f"{spacing}- {item}\n"
            if d and isinstance(d[0], dict):
                 res += f"{spacing}{'-'*40}\n"
                    
        return res

    # Update Data (Runtime override for specific user requests)
    # The user asked to remove experience from stats and show projects 'real time'
    if 'about' in PORTFOLIO_DATA and 'stats' in PORTFOLIO_DATA['about']:
        stats = PORTFOLIO_DATA['about']['stats']
        if 'experience_level' in stats:
            del stats['experience_level']
        # Rename/Update to imply "real time" - Calculate dynamically
        project_count = len(PORTFOLIO_DATA.get('projects', []))
        stats['Realtime_Projects'] = f"{project_count} Live Projects"
        if 'project_count' in stats:
            del stats['project_count']

    if base_cmd == 'cat':
        if not args:
            response_text = "Usage: cat [section_name]"
        else:
            section = args[0]
            if section in PORTFOLIO_DATA:
                use_spacing = (section == 'about')
                ignores = ['screenshot'] if section == 'projects' else []
                response_text = format_data(PORTFOLIO_DATA[section], 0, use_spacing, ignores)
            else:
                response_text = f"Error: Section '{section}' not found. Try 'ls'."
    
    elif base_cmd in COMMANDS:
        response_text = COMMANDS[base_cmd]
    
    elif base_cmd == 'date':
        from datetime import datetime
        response_text = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    elif base_cmd == 'exit':
        response_text = "Switching to GUI mode..." # Frontend should handle the switch

    # DIRECT SECTION ACCESS (e.g. 'about', 'projects')
    elif base_cmd in PORTFOLIO_DATA or base_cmd in ['skill', 'certification']:
        section_key = base_cmd
        # Handle aliases
        if base_cmd == 'skill': section_key = 'skills'
        if base_cmd == 'certification': section_key = 'certifications'
        
        if section_key in PORTFOLIO_DATA:
            use_spacing = (section_key == 'about')
            ignores = ['screenshot'] if section_key == 'projects' else []
            response_text = format_data(PORTFOLIO_DATA[section_key], 0, use_spacing, ignores)
        else:
             response_text = f"Error: Data for '{base_cmd}' not found."

    else:
        response_text = f"Command not found: {base_cmd}. Type 'help' for available commands."

    return jsonify({"output": response_text, "command": cmd_str})

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')