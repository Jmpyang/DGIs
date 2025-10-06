// ============================================
//   DIGITAL INNOVATORS - ENHANCED JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Theme Management
    initThemeToggle();
    
    // Animation Enhancements
    initScrollAnimations();
    initCardAnimations();
    initLoadingAnimations();
    
    // Interactive Features
    initSmoothScrolling();
    initImageLazyLoading();
    
    // Performance Optimizations
    initIntersectionObserver();
    
    // Resume Viewer
    initResumeViewer();
});

// ============================================
//   THEME MANAGEMENT
// ============================================
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeToggleText(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Check for user's system preference if no theme is saved
        htmlElement.setAttribute('data-theme', 'dark');
        updateThemeToggleText('dark');
    } else {
        htmlElement.setAttribute('data-theme', 'light'); // Default to light if no preference
        updateThemeToggleText('light');
    }

    themeToggle.addEventListener('click', toggleTheme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            updateThemeToggleText(newTheme);
        }
    });
}

function toggleTheme() {
    const htmlElement = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Add transition class for smooth theme change
    document.body.classList.add('theme-transition');
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleText(newTheme);
    
    // Remove transition class after animation
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 300);
}

function updateThemeToggleText(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
}

// ============================================
//   SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    // Add smooth reveal animations as elements come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards and articles
    const elementsToAnimate = document.querySelectorAll('.member, .portfolio-item, .resume, article');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// ============================================
//   CARD ANIMATIONS
// ============================================
function initCardAnimations() {
    const cards = document.querySelectorAll('.member, .portfolio-item, .resume');
    
    cards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.setProperty('--animation-delay', `${index * 0.1}s`);
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', (e) => {
            e.currentTarget.classList.add('hover-active');
        });
        
        card.addEventListener('mouseleave', (e) => {
            e.currentTarget.classList.remove('hover-active');
        });
        
        // Add click ripple effect
        card.addEventListener('click', createRippleEffect);
    });
}

function createRippleEffect(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const ripple = document.createElement('div');
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ripple.className = 'ripple-effect';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    card.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ============================================
//   LOADING ANIMATIONS
// ============================================
function initLoadingAnimations() {
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
        
        // Handle already loaded images
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
}

// ============================================
//   SMOOTH SCROLLING
// ============================================
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
//   LAZY LOADING
// ============================================
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
//   INTERSECTION OBSERVER
// ============================================
function initIntersectionObserver() {
    // Add navbar highlight based on current section
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Update active navigation link based on current section
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === currentPage) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.5
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// ============================================
//   UTILITY FUNCTIONS
// ============================================

// Add CSS for additional animations
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .theme-transition * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .hover-active {
            transform: translateY(-8px) scale(1.02) !important;
        }
        
        .ripple-effect {
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        img.loaded {
            animation: fadeIn 0.5s ease-out;
        }
        
        img.lazy {
            opacity: 0;
            transition: opacity 0.3s;
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize dynamic styles
addDynamicStyles();

// ============================================
//   RESUME VIEWER FUNCTIONALITY
// ============================================
function initResumeViewer() {
    const memberCards = document.querySelectorAll('.member-card');
    const resumeModal = document.getElementById('resume-modal');
    const closeBtn = document.querySelector('.close-resume');
    const downloadBtn = document.querySelector('.download-pdf-btn');
    const printBtn = document.querySelector('.print-resume-btn');
    
    if (!memberCards.length || !resumeModal) return;
    
    // Add click handlers to member cards
    memberCards.forEach(card => {
        const viewBtn = card.querySelector('.view-resume-btn');
        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const resumeId = card.getAttribute('data-resume');
                openResumeModal(resumeId);
            });
        }
        
        // Also allow clicking the card itself
        card.addEventListener('click', () => {
            const resumeId = card.getAttribute('data-resume');
            openResumeModal(resumeId);
        });
    });
    
    // Close modal handlers
    if (closeBtn) {
        closeBtn.addEventListener('click', closeResumeModal);
    }
    
    // Close on background click
    resumeModal.addEventListener('click', (e) => {
        if (e.target === resumeModal) {
            closeResumeModal();
        }
    });
    
    // Download and print handlers
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const activeResume = resumeModal.querySelector('.resume-content').getAttribute('data-current-resume');
            if (activeResume) {
                downloadResume(activeResume);
            }
        });
    }
    
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            printResume();
        });
    }
    
    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
            closeResumeModal();
        }
    });
}

function openResumeModal(resumeId) {
    const modal = document.getElementById('resume-modal');
    const content = document.getElementById('resume-content');
    
    if (!modal || !content) return;
    
    // Set current resume ID
    content.setAttribute('data-current-resume', resumeId);
    
    // Load resume content
    content.innerHTML = generateResumeContent(resumeId);
    
    // Show modal with animation
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add fade-in animation to content
    setTimeout(() => {
        content.style.opacity = '1';
    }, 100);
}

function closeResumeModal() {
    const modal = document.getElementById('resume-modal');
    const content = document.getElementById('resume-content');
    
    if (!modal) return;
    
    // Hide modal with animation
    content.style.opacity = '0';
    
    setTimeout(() => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }, 300);
}

function generateResumeContent(resumeId) {
    const resumeData = getResumeData(resumeId);
    
    if (!resumeData) {
        return '<div class="resume-error">Resume not found</div>';
    }
    
    return `
        <div class="resume-layout">
            <div class="resume-sidebar">
                <div class="resume-profile">
                    <img src="${resumeData.image}" alt="${resumeData.name}">
                    <h1>${resumeData.name}</h1>
                    <div class="job-title">${resumeData.title}</div>
                </div>
                
                <div class="resume-contact">
                    <h2>Contact</h2>
                    ${resumeData.contact.map(item => `
                        <div class="contact-item">
                            <i class="fa ${item.icon}"></i>
                            ${item.link ? `<a href="${item.link}">${item.text}</a>` : `<span>${item.text}</span>`}
                        </div>
                    `).join('')}
                </div>
                
                <div class="resume-section">
                    <h2>Skills</h2>
                    ${resumeData.skills.map(skill => `
                        <div class="skill-item">
                            <span class="skill-name">${skill.name}</span>
                            <div class="skill-level">
                                ${Array.from({length: 5}, (_, i) => `
                                    <div class="skill-dot ${i < skill.level ? 'active' : ''}"></div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                ${resumeData.languages ? `
                <div class="resume-section">
                    <h2>Languages</h2>
                    ${resumeData.languages.map(lang => `
                        <div class="skill-item">
                            <span class="skill-name">${lang.name}</span>
                            <span style="font-size: var(--font-size-sm); color: var(--text-tertiary);">${lang.level}</span>
                        </div>
                    `).join('')}
                </div>` : ''}
            </div>
            
            <div class="resume-main">
                ${resumeData.summary ? `
                <div class="resume-section">
                    <h2>Professional Summary</h2>
                    <p>${resumeData.summary}</p>
                </div>` : ''}
                
                <div class="resume-section">
                    <h2>Experience</h2>
                    ${resumeData.experience.map(exp => `
                        <div class="experience-item">
                            <div class="experience-date">${exp.date}</div>
                            <h3>${exp.position}</h3>
                            <div class="experience-company">${exp.company}</div>
                            <ul>
                                ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
                
                ${resumeData.education ? `
                <div class="resume-section">
                    <h2>Education</h2>
                    ${resumeData.education.map(edu => `
                        <div class="experience-item">
                            <div class="experience-date">${edu.date}</div>
                            <h3>${edu.degree}</h3>
                            <div class="experience-company">${edu.institution}</div>
                            ${edu.details ? `<p>${edu.details}</p>` : ''}
                        </div>
                    `).join('')}
                </div>` : ''}
                
                ${resumeData.certifications ? `
                <div class="resume-section">
                    <h2>Certifications</h2>
                    <ul>
                        ${resumeData.certifications.map(cert => `<li>${cert}</li>`).join('')}
                    </ul>
                </div>` : ''}
                
                ${resumeData.projects ? `
                <div class="resume-section">
                    <h2>Notable Projects</h2>
                    ${resumeData.projects.map(project => `
                        <div class="experience-item">
                            <h3>${project.name}</h3>
                            <p>${project.description}</p>
                            ${project.technologies ? `<p><strong>Technologies:</strong> ${project.technologies}</p>` : ''}
                        </div>
                    `).join('')}
                </div>` : ''}
            </div>
        </div>
    `;
}

function getResumeData(resumeId) {
    const resumeDatabase = {
        joshua: {
            name: 'Joshua Pius',
            title: 'Web Developer',
            image: 'images/joshua.jpeg',
            contact: [
                { icon: 'fa-phone', text: '+254717340006', link: 'tel:+254717340006' },
                { icon: 'fa-envelope', text: 'jmpyang66@gmail.com', link: 'mailto:jmpyang66@gmail.com' },
                { icon: 'fa-whatsapp', text: 'WhatsApp', link: 'https://wa.me/+254717340006' },
                { icon: 'fa-map-marker', text: 'Kenya' }
            ],
            summary: 'Passionate Web Developer with a keen eye for design and a knack for crafting intuitive user experiences. Strong foundation in modern web technologies with expertise in creating responsive, user-friendly applications.',
            skills: [
                { name: 'HTML/CSS', level: 5 },
                { name: 'JavaScript', level: 4 },
                { name: 'React', level: 4 },
                { name: 'Node.js', level: 3 },
                { name: 'Responsive Design', level: 5 },
                { name: 'UI/UX Design', level: 4 }
            ],
            experience: [
                {
                    position: 'Frontend Developer',
                    company: 'Tech Solutions Inc.',
                    date: '2022 - Present',
                    responsibilities: [
                        'Developed responsive web applications using React and modern CSS',
                        'Collaborated with design teams to implement pixel-perfect interfaces',
                        'Optimized website performance achieving 95+ lighthouse scores',
                        'Mentored junior developers and conducted code reviews'
                    ]
                },
                {
                    position: 'Web Developer',
                    company: 'Digital Agency',
                    date: '2020 - 2022',
                    responsibilities: [
                        'Built custom websites for clients using HTML, CSS, and JavaScript',
                        'Implemented responsive design principles for mobile-first approach',
                        'Integrated third-party APIs and services',
                        'Maintained and updated existing client websites'
                    ]
                }
            ],
            education: [
                {
                    degree: 'Bachelor of Computer Science',
                    institution: 'University of Nairobi',
                    date: '2018 - 2021',
                    details: 'Focus on Software Engineering and Web Technologies'
                }
            ],
            projects: [
                {
                    name: 'E-commerce Platform',
                    description: 'Built a fully functional e-commerce platform with React and Node.js featuring product search, shopping cart, and secure checkout',
                    technologies: 'React, Node.js, MongoDB, Stripe API'
                }
            ],
            languages: [
                { name: 'English', level: 'Native' },
                { name: 'Swahili', level: 'Native' }
            ]
        },
        
        giddy: {
            name: 'Giddy Ivutha',
            title: 'Cybersecurity Specialist',
            image: 'images/giddy.jpeg',
            contact: [
                { icon: 'fa-phone', text: '+254758387321', link: 'tel:+254758387321' },
                { icon: 'fa-envelope', text: 'giddy.ivutha@email.com', link: 'mailto:giddy.ivutha@email.com' },
                { icon: 'fa-whatsapp', text: 'WhatsApp', link: 'https://wa.me/+254758387321' },
                { icon: 'fa-map-marker', text: 'Kenya' }
            ],
            summary: 'Experienced Cybersecurity Specialist with deep understanding of network security, penetration testing, and threat intelligence. Certified ethical hacker with proven track record in securing enterprise systems.',
            skills: [
                { name: 'Network Security', level: 5 },
                { name: 'Penetration Testing', level: 5 },
                { name: 'Incident Response', level: 4 },
                { name: 'Risk Assessment', level: 4 },
                { name: 'SIEM Tools', level: 4 },
                { name: 'Vulnerability Assessment', level: 5 }
            ],
            experience: [
                {
                    position: 'Senior Cybersecurity Analyst',
                    company: 'Financial Services Corp',
                    date: '2021 - Present',
                    responsibilities: [
                        'Conducted comprehensive security audits reducing breach incidents by 60%',
                        'Implemented automated SIEM system decreasing incident response time by 35%',
                        'Led penetration testing initiatives across enterprise infrastructure',
                        'Developed security policies and procedures for compliance requirements'
                    ]
                },
                {
                    position: 'Cybersecurity Specialist',
                    company: 'Tech Security Solutions',
                    date: '2019 - 2021',
                    responsibilities: [
                        'Performed vulnerability assessments and security testing',
                        'Monitored network traffic for suspicious activities',
                        'Responded to security incidents and conducted forensic analysis',
                        'Provided security awareness training to staff members'
                    ]
                }
            ],
            education: [
                {
                    degree: 'Bachelor of Information Technology',
                    institution: 'Kenyatta University',
                    date: '2015 - 2019',
                    details: 'Specialization in Network Security and Information Systems'
                }
            ],
            certifications: [
                'Certified Ethical Hacker (CEH)',
                'Certified Information Systems Security Professional (CISSP)',
                'CompTIA Security+',
                'GIAC Security Essentials (GSEC)'
            ],
            projects: [
                {
                    name: 'Enterprise Security Assessment',
                    description: 'Comprehensive security audit for financial institution identifying critical vulnerabilities and implementing remediation strategies',
                    technologies: 'Wireshark, Kali Linux, Splunk, Python, Nessus'
                }
            ]
        },
        
        kipkirui: {
            name: 'Bethwel Kipkirui',
            title: 'Data Scientist',
            image: 'images/kipkirui.jpeg',
            contact: [
                { icon: 'fa-phone', text: '+254720975965', link: 'tel:+254720975965' },
                { icon: 'fa-envelope', text: 'bethwel.kipkirui@email.com', link: 'mailto:bethwel.kipkirui@email.com' },
                { icon: 'fa-whatsapp', text: 'WhatsApp', link: 'https://wa.me/+254720975965' },
                { icon: 'fa-map-marker', text: 'Kenya' }
            ],
            summary: 'Experienced Data Scientist with expertise in machine learning, statistical analysis, and data visualization. Skilled in turning complex data into actionable insights that drive business decisions.',
            skills: [
                { name: 'Python', level: 5 },
                { name: 'R', level: 4 },
                { name: 'Machine Learning', level: 5 },
                { name: 'SQL', level: 4 },
                { name: 'Tableau', level: 4 },
                { name: 'TensorFlow', level: 4 },
                { name: 'Statistical Analysis', level: 5 }
            ],
            experience: [
                {
                    position: 'Senior Data Scientist',
                    company: 'Telecommunications Corp',
                    date: '2022 - Present',
                    responsibilities: [
                        'Developed machine learning model to predict customer churn, increasing retention by 20%',
                        'Built interactive dashboards in Tableau reducing reporting time by 50%',
                        'Led data mining initiatives to identify new business opportunities',
                        'Collaborated with cross-functional teams to implement data-driven solutions'
                    ]
                },
                {
                    position: 'Data Analyst',
                    company: 'Market Research Firm',
                    date: '2020 - 2022',
                    responsibilities: [
                        'Conducted statistical analysis on large datasets to identify trends',
                        'Created predictive models for customer behavior analysis',
                        'Developed automated reporting systems using Python and SQL',
                        'Presented findings to stakeholders through data visualizations'
                    ]
                }
            ],
            education: [
                {
                    degree: 'Master of Data Science',
                    institution: 'University of Nairobi',
                    date: '2018 - 2020',
                    details: 'Thesis on Machine Learning Applications in Business Intelligence'
                },
                {
                    degree: 'Bachelor of Statistics',
                    institution: 'Moi University',
                    date: '2014 - 2018',
                    details: 'Focus on Applied Statistics and Data Analysis'
                }
            ],
            projects: [
                {
                    name: 'Customer Churn Prediction Model',
                    description: 'Machine learning model to predict customer churn with 85% accuracy, enabling proactive retention strategies',
                    technologies: 'Python, Scikit-learn, Pandas, Tableau'
                }
            ]
        },
        
        benson: {
            name: 'Benson Kivuva',
            title: 'AI Expert & Cybersecurity Specialist',
            image: 'images/benson.jpeg',
            contact: [
                { icon: 'fa-phone', text: '+254758853681', link: 'tel:+254758853681' },
                { icon: 'fa-envelope', text: 'mrcrooked38@gmail.com', link: 'mailto:mrcrooked38@gmail.com' },
                { icon: 'fa-whatsapp', text: 'WhatsApp', link: 'https://wa.me/+254758853681' },
                { icon: 'fa-map-marker', text: 'Kenya' }
            ],
            summary: 'Talented AI expert with passion for applying artificial intelligence to cybersecurity challenges. Skilled in developing AI-powered security solutions and threat detection systems.',
            skills: [
                { name: 'Artificial Intelligence', level: 5 },
                { name: 'Machine Learning', level: 5 },
                { name: 'Cybersecurity', level: 4 },
                { name: 'Python', level: 5 },
                { name: 'Deep Learning', level: 4 },
                { name: 'Network Analysis', level: 4 },
                { name: 'Threat Detection', level: 4 }
            ],
            experience: [
                {
                    position: 'AI Security Researcher',
                    company: 'CyberTech Innovations',
                    date: '2022 - Present',
                    responsibilities: [
                        'Developed AI-powered threat detection systems using machine learning',
                        'Created packet sniffing tools for network traffic analysis',
                        'Implemented neural networks for anomaly detection in security logs',
                        'Research and development of AI applications in cybersecurity'
                    ]
                },
                {
                    position: 'Machine Learning Engineer',
                    company: 'Security Solutions Ltd',
                    date: '2020 - 2022',
                    responsibilities: [
                        'Built ML models for identifying security threats and vulnerabilities',
                        'Developed automated systems for network monitoring and analysis',
                        'Collaborated with security teams to integrate AI into existing workflows',
                        'Optimized algorithms for real-time threat detection'
                    ]
                }
            ],
            education: [
                {
                    degree: 'Master of Artificial Intelligence',
                    institution: 'Strathmore University',
                    date: '2018 - 2020',
                    details: 'Specialization in AI Applications for Cybersecurity'
                },
                {
                    degree: 'Bachelor of Computer Science',
                    institution: 'JKUAT',
                    date: '2014 - 2018',
                    details: 'Focus on Software Engineering and AI'
                }
            ],
            projects: [
                {
                    name: 'AI-Powered Network Security System',
                    description: 'Developed packet sniffing tool with AI-enhanced threat detection, successfully identifying ARP spoofing and DNS attacks',
                    technologies: 'Python, Wireshark, Scapy, TensorFlow, Nmap'
                }
            ],
            certifications: [
                'Certified AI Professional',
                'Machine Learning Specialist',
                'Network Security Analyst'
            ]
        },
        
        gladys: {
            name: 'Gladys Chebet',
            title: 'Cloud Solutions Architect',
            image: 'images/gladys.jpeg',
            contact: [
                { icon: 'fa-phone', text: '+254701358481', link: 'tel:+254701358481' },
                { icon: 'fa-envelope', text: 'gladys.chebet@email.com', link: 'mailto:gladys.chebet@email.com' },
                { icon: 'fa-whatsapp', text: 'WhatsApp', link: 'https://wa.me/+254701358481' },
                { icon: 'fa-map-marker', text: 'Kenya' }
            ],
            summary: 'Experienced Cloud Solutions Architect with 7+ years in designing, deploying, and managing cloud infrastructure. Expert in major cloud platforms with proven track record of successful migrations and optimizations.',
            skills: [
                { name: 'AWS', level: 5 },
                { name: 'Azure', level: 4 },
                { name: 'Google Cloud', level: 4 },
                { name: 'Terraform', level: 5 },
                { name: 'Kubernetes', level: 4 },
                { name: 'Docker', level: 4 },
                { name: 'DevOps', level: 4 }
            ],
            experience: [
                {
                    position: 'Senior Cloud Architect',
                    company: 'Enterprise Solutions Inc',
                    date: '2021 - Present',
                    responsibilities: [
                        'Led cloud migration project for logistics firm reducing operational costs by 40%',
                        'Designed disaster recovery plan achieving 99.9% uptime for critical applications',
                        'Architected scalable cloud infrastructure supporting 1M+ users',
                        'Mentored development teams on cloud best practices and DevOps methodologies'
                    ]
                },
                {
                    position: 'Cloud Engineer',
                    company: 'Tech Innovations Ltd',
                    date: '2018 - 2021',
                    responsibilities: [
                        'Implemented Infrastructure as Code using Terraform and Ansible',
                        'Managed containerized applications using Kubernetes and Docker',
                        'Optimized cloud resources reducing monthly costs by 30%',
                        'Automated deployment pipelines improving release frequency by 50%'
                    ]
                }
            ],
            education: [
                {
                    degree: 'Master of Cloud Computing',
                    institution: 'University of Nairobi',
                    date: '2016 - 2018',
                    details: 'Specialized in Cloud Architecture and Distributed Systems'
                },
                {
                    degree: 'Bachelor of Information Technology',
                    institution: 'Egerton University',
                    date: '2012 - 2016',
                    details: 'Focus on Systems Administration and Network Infrastructure'
                }
            ],
            certifications: [
                'AWS Solutions Architect Professional',
                'Microsoft Azure Solutions Architect Expert',
                'Google Cloud Professional Cloud Architect',
                'Certified Kubernetes Administrator (CKA)',
                'Terraform Associate'
            ],
            projects: [
                {
                    name: 'Enterprise Cloud Migration',
                    description: 'Led complete migration of on-premises infrastructure to AWS, achieving 40% cost reduction and improved scalability',
                    technologies: 'AWS, Terraform, Kubernetes, Ansible, Jenkins'
                }
            ]
        },
        
        eunice: {
            name: 'Eunice Kennedy',
            title: 'Full-Stack Software Engineer',
            image: 'images/eunice.jpeg',
            contact: [
                { icon: 'fa-phone', text: '+254708457172', link: 'tel:+254708457172' },
                { icon: 'fa-envelope', text: 'eunice.kennedy@email.com', link: 'mailto:eunice.kennedy@email.com' },
                { icon: 'fa-whatsapp', text: 'WhatsApp', link: 'https://wa.me/+254708457172' },
                { icon: 'fa-map-marker', text: 'Kenya' }
            ],
            summary: 'Seasoned Full-Stack Software Engineer with 6+ years of experience building scalable web applications. Expert in modern JavaScript frameworks and backend technologies with focus on user experience and performance.',
            skills: [
                { name: 'JavaScript', level: 5 },
                { name: 'React', level: 5 },
                { name: 'Node.js', level: 5 },
                { name: 'Python', level: 4 },
                { name: 'PostgreSQL', level: 4 },
                { name: 'MongoDB', level: 4 },
                { name: 'Docker', level: 4 },
                { name: 'Git', level: 5 }
            ],
            experience: [
                {
                    position: 'Senior Full-Stack Developer',
                    company: 'Digital Solutions Corp',
                    date: '2022 - Present',
                    responsibilities: [
                        'Developed real-time chat application increasing user engagement by 30%',
                        'Built automated testing suite with Jest and Cypress reducing bug reports by 40%',
                        'Led migration from legacy systems to modern React-based architecture',
                        'Mentored junior developers and conducted technical interviews'
                    ]
                },
                {
                    position: 'Full-Stack Developer',
                    company: 'StartupTech Inc',
                    date: '2019 - 2022',
                    responsibilities: [
                        'Built scalable web applications using React, Node.js, and PostgreSQL',
                        'Implemented RESTful APIs and microservices architecture',
                        'Optimized application performance achieving 95+ lighthouse scores',
                        'Collaborated with product team to deliver user-centric features'
                    ]
                }
            ],
            education: [
                {
                    degree: 'Bachelor of Software Engineering',
                    institution: 'Technical University of Kenya',
                    date: '2015 - 2019',
                    details: 'Focus on Web Development and Software Architecture'
                }
            ],
            projects: [
                {
                    name: 'Real-Time Chat Application',
                    description: 'Built scalable chat application with Socket.IO supporting 10,000+ concurrent users, featuring real-time messaging and file sharing',
                    technologies: 'React, Node.js, Socket.IO, PostgreSQL, Docker'
                },
                {
                    name: 'E-commerce Platform',
                    description: 'Full-stack e-commerce solution with payment integration, inventory management, and analytics dashboard',
                    technologies: 'React, Express.js, MongoDB, Stripe API'
                }
            ],
            languages: [
                { name: 'English', level: 'Fluent' },
                { name: 'Swahili', level: 'Native' },
                { name: 'French', level: 'Intermediate' }
            ]
        }
    };
    
    return resumeDatabase[resumeId] || null;
}

function downloadResume(resumeId) {
    // In a real implementation, this would download the actual PDF
    // For now, we'll create a link to the PDF file
    const resumeFiles = {
        joshua: 'resumes/joshua_resume.pdf',
        giddy: 'resumes/gideon_resume.pdf',
        kipkirui: 'resumes/kipkirui_resume.pdf',
        benson: 'resumes/benson_resume.pdf',
        gladys: 'resumes/gladys_resume.pdf',
        eunice: 'resumes/eunice_resume.pdf'
    };
    
    const fileName = resumeFiles[resumeId];
    if (fileName) {
        const link = document.createElement('a');
        link.href = fileName;
        link.download = fileName.split('/').pop();
        link.click();
    }
}

function printResume() {
    const resumeContent = document.querySelector('.resume-content');
    if (!resumeContent) return;
    
    // Create a new window with the resume content
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Resume</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    line-height: 1.4; 
                    color: #333; 
                    margin: 20px;
                }
                .resume-layout { 
                    display: grid; 
                    grid-template-columns: 1fr 2fr; 
                    gap: 30px; 
                }
                .resume-sidebar { 
                    background: #f8f9fa; 
                    padding: 20px; 
                    border-radius: 10px; 
                }
                .resume-profile img { 
                    width: 100px; 
                    height: 100px; 
                    border-radius: 50%; 
                    display: block; 
                    margin: 0 auto 15px; 
                }
                .resume-profile h1 { 
                    text-align: center; 
                    margin-bottom: 5px; 
                    color: #2563eb; 
                }
                .job-title { 
                    text-align: center; 
                    color: #6b7280; 
                    margin-bottom: 20px; 
                }
                h2 { 
                    color: #2563eb; 
                    border-bottom: 2px solid #dbeafe; 
                    padding-bottom: 5px; 
                    margin-top: 25px; 
                    margin-bottom: 15px; 
                }
                h3 { 
                    margin-bottom: 5px; 
                    color: #374151; 
                }
                .contact-item { 
                    margin-bottom: 10px; 
                    font-size: 14px; 
                }
                .skill-item { 
                    display: flex; 
                    justify-content: space-between; 
                    margin-bottom: 8px; 
                    font-size: 14px; 
                }
                .experience-item { 
                    margin-bottom: 20px; 
                    padding-left: 15px; 
                    border-left: 3px solid #2563eb; 
                }
                .experience-date { 
                    font-size: 12px; 
                    color: #6b7280; 
                    margin-bottom: 5px; 
                }
                .experience-company { 
                    font-size: 14px; 
                    color: #06b6d4; 
                    margin-bottom: 10px; 
                }
                ul { 
                    margin: 10px 0; 
                    padding-left: 20px; 
                }
                li { 
                    margin-bottom: 5px; 
                    font-size: 14px; 
                }
                @media print { 
                    body { margin: 0; } 
                    .resume-layout { grid-template-columns: 1fr; gap: 15px; } 
                }
            </style>
        </head>
        <body>
            ${resumeContent.innerHTML}
        </body>
        </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load then print
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
}
