'use client'

import React, {useState, useEffect} from "react";
import Image from "next/image";
import {FaGithub, FaLinkedin} from "react-icons/fa";
import {
    FiBriefcase,
    FiUser,
    FiCode,
    FiMessageCircle,
    FiAward,
    FiExternalLink,
    FiGithub as FiGithubProject,
    FiSearch, FiUsers, FiTarget
} from "react-icons/fi";
import emailjs from '@emailjs/browser';

const sections = [
    {id: 'overview', label: 'overview', icon: FiUser},
    {id: 'about-me', label: 'about me', icon: FiUser},
    {id: 'projects', label: 'projects', icon: FiBriefcase},
    {id: 'technical-skills', label: 'technical skills', icon: FiCode},
    {id: 'character', label: 'my values', icon: FiAward},
    {id: 'contact', label: 'contact', icon: FiMessageCircle}
];

const socialLinks = [
    {
        icon: FaGithub,
        label: 'GitHub',
        href: 'https://github.com/ALinuxPerson'
    },
    {
        icon: FaLinkedin,
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/michael-baterna-142379315/'
    }
];

const NavigationBar = () => {
    const [activeSection, setActiveSection] = useState(sections[0].id);

    useEffect(() => {
        const observers = sections.map(({id}) => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(id);
                    }
                },
                {threshold: 0.5}
            );

            const element = document.getElementById(id);
            if (element) observer.observe(element);
            return {id, observer};
        });

        return () => {
            observers.forEach(({id, observer}) => {
                const element = document.getElementById(id);
                if (element) observer.unobserve(element);
            });
        };
    }, []);

    return (
        <nav
            className="z-30 fixed top-0 w-full px-6 py-4 flex justify-between items-center bg-[#0a0a0a]/90 backdrop-blur-md border-b border-neutral-800 shadow-lg">
            <div className="flex items-center">
                <span className="font-mono font-bold text-xl text-[#ededed]">
                    michael baterna
                    <span
                        className="inline-block w-[0.5em] h-[1.1em] ml-[2px] animate-[blink_1s_steps(2)_infinite]">_</span>
                </span>
            </div>
            <div className="hidden md:flex items-center gap-6">
                {sections.map(({id, label, icon: IconComp}) => (
                    <a
                        key={id}
                        href={`#${id}`}
                        className={`font-mono text-sm transition-colors flex items-center gap-2 ${
                            activeSection === id ? 'text-neutral-100 font-semibold' : 'text-neutral-400 hover:text-neutral-200'
                        }`}
                    >
                        <IconComp className="w-4 h-4" />
                        {label}
                    </a>
                ))}
            </div>
        </nav>
    )
}

const OverviewSection = () => {
    return (
        <div
            id="overview"
            className="relative min-h-screen overflow-hidden flex items-center justify-center"
        >
            {/* Background */}
            <div
                className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-25 scale-100"
                style={{
                    backgroundImage: 'url("/hero-background.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black/75"/>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 min-h-screen flex items-center px-8 py-24 md:py-40">
                <div
                    className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
                    <div
                        className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
                        <div
                            className="w-56 h-56 md:w-80 md:h-80 rounded-full border-4 border-neutral-700/60 overflow-hidden shadow-xl ring-2 ring-neutral-600/40 ring-offset-4 ring-offset-[#0a0a0a]">
                            <Image
                                src="/profile-picture.jpg"
                                alt="Michael Baterna"
                                className="w-full h-full object-cover"
                                width={320} // md:w-80
                                height={320} // md:h-80
                                priority
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-start gap-5 text-center md:text-left">
                        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-neutral-100 to-neutral-300 bg-clip-text text-transparent drop-shadow-md">
                            Michael Baterna
                        </h1>
                        <div className="space-y-2">
                            <p className="text-xl md:text-2xl text-neutral-200">
                                Aspiring Software Developer
                            </p>
                            <p className="text-lg md:text-xl text-neutral-300">
                                Specializing in Rust, Python, and systems-level programming.
                            </p>
                            <p className="text-lg md:text-xl text-neutral-300">
                                Passionate about building efficient and impactful software solutions.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                            <a
                                href="/placeholder-resume.pdf" // Placeholder link for resume
                                download
                                className="px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 text-center"
                            >
                                Download Resume
                            </a>
                            <a
                                href="#contact"
                                className="px-8 py-3 bg-neutral-700 hover:bg-neutral-600 text-neutral-200 font-semibold rounded-lg shadow-md transition-colors duration-300 text-center"
                            >
                                Contact Me
                            </a>
                        </div>


                        {/* Social Links */}
                        <div className="flex gap-5 mt-6">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={link.label}
                                    className="text-neutral-400 hover:text-neutral-100 transition-colors duration-200"
                                >
                                    <link.icon className="w-7 h-7 md:w-8 md:h-8"/>
                                    <span className="sr-only">{link.label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const AboutMeSection = () => {
    return (
        <section id="about-me" className="bg-[#0a0a0a] py-16 md:py-24 border-t border-neutral-800">
            <div className="max-w-4xl mx-auto px-6 md:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-8 text-center font-mono">
                    {'// About Me'}
                </h2>
                <div className="text-neutral-300 space-y-6 leading-relaxed text-lg">
                    <p>
                        Hello! I&#39;m <b>Michael C. Baterna</b>, also known online as <b>ALinuxPerson</b>.
                        My journey into the world of computers and software development began from a young age, driven by a deep fascination with technology&#39;s potential to solve real-world problems and drive positive change.
                        I specialize in desktop-oriented applications and embedded programming, and I&#39;m always eager to explore new domains, including web and game development.
                    </p>
                    <p>
                        I approach challenges with a logical and analytical mindset, believing that understanding the &#39;why&#39; and &#39;how&#39; is key to effective problem-solving. This curiosity naturally led me to software development.
                        When I&#39;m not immersed in code, I enjoy connecting with nature through walks and outdoor activities. Indoors, I unwind with casual gaming, exploring titles like Minecraft and Deltarune.
                    </p>
                </div>
            </div>
        </section>
    )
}

// NEW: Projects Section
const ProjectsSection = () => {
    // TODO: Populate this with your actual projects!
    const projects = [
        {
            title: "mcsoft_auth Crate",
            description: "A Rust crate for handling Microsoft authentication, enabling developers to easily integrate Xbox Live and Minecraft authentication into their applications.",
            imageUrl: "/placeholder-project-1.png", // TODO: Replace with actual project image
            tech: ["Rust", "API Integration", "Authentication"],
            liveUrl: null, // Optional
            repoUrl: "https://github.com/ALinuxPerson/mcsoft_auth",
        },
        {
            title: "oom-notifier Utility",
            description: "A Python-based utility for Linux systems that monitors process OOM (Out of Memory) scores and sends notifications when they reach critical levels, helping prevent system instability.",
            imageUrl: "/placeholder-project-2.png", // TODO: Replace with actual project image
            tech: ["Python", "Linux Systems", "System Monitoring"],
            liveUrl: null,
            repoUrl: "https://github.com/ALinuxPerson/oom-notifier",
        },
        {
            title: "Portfolio Website (This one!)",
            description: "My personal portfolio site built with Next.js and Tailwind CSS to showcase my skills, projects, and professional journey. Features a responsive design and smooth scrolling.",
            imageUrl: "/placeholder-project-3.png", // TODO: Replace with screenshot of this site
            tech: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
            liveUrl: "#", // Link to itself or deployed URL
            repoUrl: "https://github.com/ALinuxPerson/your-portfolio-repo", // TODO: Link to your portfolio repo
        },
        // TODO: Add more projects. Aim for 3-5 strong examples.
    ];

    return (
        <section id="projects" className="bg-neutral-900 py-16 md:py-24 border-t border-neutral-800">
            <div className="max-w-6xl mx-auto px-6 md:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-12 text-center font-mono">
                    {'// My Work'}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="bg-[#0a0a0a] border border-neutral-800 rounded-lg shadow-xl overflow-hidden flex flex-col transform hover:scale-[1.02] transition-transform duration-300">
                            <Image
                                src={project.imageUrl || "/placeholder-project-default.png"}
                                alt={project.title}
                                width={600}
                                height={350}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-semibold text-neutral-100 mb-2">{project.title}</h3>
                                <p className="text-neutral-400 text-sm leading-relaxed mb-4 flex-grow">{project.description}</p>
                                <div className="mb-4">
                                    <h4 className="text-xs font-semibold text-neutral-300 uppercase mb-1">Technologies:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map(t => (
                                            <span key={t} className="text-xs bg-neutral-700/50 text-neutral-300 px-2 py-1 rounded-full">{t}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-auto pt-4 border-t border-neutral-800/50">
                                    {project.liveUrl && (
                                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 transition-colors font-medium text-sm inline-flex items-center gap-1">
                                            <FiExternalLink /> Live Demo
                                        </a>
                                    )}
                                    {project.repoUrl && (
                                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-200 transition-colors font-medium text-sm inline-flex items-center gap-1">
                                            <FiGithubProject /> View Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {projects.length === 0 && (
                    <p className="text-center text-neutral-400">More projects coming soon. Stay tuned!</p>
                )}
            </div>
        </section>
    );
}


const CharacterSection = () => {
    const values = [
        {
            title: "Curiosity",
            description: "I possess a strong drive to understand how things work, from surface-level concepts to intricate underlying mechanisms. This fuels my continuous learning and exploration in technology.",
            icon: FiSearch
        },
        {
            title: "Open-mindedness",
            description: "I embrace new ideas, diverse perspectives, and evolving frameworks. I believe collaboration and adaptability are crucial in the ever-changing landscape of technology.",
            icon: FiUsers
        },
        {
            title: "Ambition & Initiative",
            description: "I am driven to turn ideas into reality and actively seek opportunities for growth and impact. I believe in taking initiative and pursuing goals with determination.",
            icon: FiTarget
        }
    ];

    return (
        <section id="character" className="bg-[#0a0a0a] py-16 md:py-24 border-t border-neutral-800">
            <div className="max-w-4xl mx-auto px-6 md:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-12 text-center font-mono">
                    {'// My Core Values'}
                </h2>
                <div className="space-y-8">
                    {values.map((value) => (
                        <div
                            key={value.title}
                            className="bg-neutral-900/60 p-6 rounded-lg border border-neutral-800 shadow-lg"
                        >
                            <value.icon className="w-8 h-8 text-sky-400 mb-3" />
                            <h3 className="text-2xl font-semibold text-neutral-100 mb-2">
                                {value.title}
                            </h3>
                            <p className="text-neutral-300 leading-relaxed">
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const TechnicalSkillsSection = () => {
    // TODO: Expand this list with more specific skills (frameworks, tools, databases, OS, etc.)
    const skills = [
        {
            image: "/rust-logo.png",
            title: "Rust Development",
            description: `Proficient in Rust with 4+ years of experience, including creating open-source crates like \`mcsoft_auth\`, \`build_script\`, and \`try-drop\`. Experienced with asynchronous programming (Tokio) and systems-level development.`,
            width: 128,
            height: 128
        },
        {
            image: "/python-logo.png",
            title: "Python Development",
            description: `Skilled in Python for scripting, backend development, and utilities. Developed tools like \`oom-notifier\` for Linux system monitoring. Familiar with common libraries and frameworks.`,
            width: 128,
            height: 128
        },
        {
            image: "/os-api-logo.png",
            title: "Cross-Platform Development",
            description: `Experience developing software for Linux, Windows, and macOS, leveraging platform-specific APIs (e.g., Win32, POSIX) and cross-platform frameworks when appropriate.`,
            width: 128,
            height: 128
        },
        {
            image: "/git-logo.png", // TODO: Add git-logo.png to your /public folder
            title: "Version Control (Git)",
            description: "Proficient with Git and GitHub for version control, branching, merging, and collaborative development workflows.",
            width: 128,
            height: 128
        },
    ];

    return (
        <section id="technical-skills" className="bg-neutral-900 py-16 md:py-24 border-t border-neutral-800 text-white">
            <div className="max-w-5xl mx-auto px-6 md:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-12 text-center font-mono">
                    {'// Technical Skills'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {skills.map((skill) => (
                        <div key={skill.title} className="bg-[#0a0a0a] border border-neutral-800 p-6 rounded-lg flex flex-col items-center text-center shadow-lg transform hover:bg-neutral-800/30 transition-colors">
                            <Image src={skill.image} alt={skill.title} className="w-24 h-24 mb-4" width={skill.width} height={skill.height}/>
                            <h3 className="text-xl font-semibold text-neutral-100 mb-2">{skill.title}</h3>
                            <p className="text-neutral-400 text-sm leading-relaxed">{skill.description}</p>
                        </div>
                    ))}
                </div>
                <p className="text-center text-neutral-500 mt-12 font-mono text-sm">
                    ...and always learning more.
                </p>
            </div>
        </section>
    );
}

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(''); // 'success', 'error', ''

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('');

        try {
            const result = await emailjs.send(
                "service_e4iqz8c",
                "template_jz2ggcl",
                {
                    name: formData.name,
                    email: formData.email || "Not provided",
                    time: new Date().toLocaleString(),
                    message: formData.message,
                },
                "v3WkmkyHvDqv2s9hp"
            );

            console.log("Email sent successfully: ", result);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error("Error sending email: ", error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section id="contact" className="bg-[#0a0a0a] py-16 md:py-24 border-t border-neutral-800">
            <div className="max-w-5xl mx-auto px-6 md:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-mono font-bold text-neutral-100 mb-3">
                        {'// Get In Touch'}
                    </h2>
                    <p className="text-neutral-400 text-lg">
                        I&#39;m always open to discussing new projects, creative ideas, or opportunities to collaborate.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10 md:gap-12">
                    {/* Contact Information & Socials */}
                    <div className="space-y-8">
                        <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800 shadow-md">
                            <h3 className="text-xl font-semibold text-neutral-100 mb-4">Contact Details</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-neutral-300">
                                    <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                    <a href="mailto:micheal02052007@gmail.com" className="hover:text-sky-300 transition-colors">micheal02052007@gmail.com</a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800 shadow-md">
                            <h3 className="text-xl font-semibold text-neutral-100 mb-4">Connect Online</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 text-neutral-300 hover:text-sky-300 transition-colors duration-200 p-3 rounded-md hover:bg-neutral-800/50"
                                    >
                                        <link.icon className="w-5 h-5"/>
                                        <span className="font-medium">{link.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800 shadow-md">
                        <h3 className="text-xl font-semibold text-neutral-100 mb-4">Send a Message</h3>

                        {/* Status Messages */}
                        {submitStatus === 'success' && (
                            <div className="mb-4 p-3 bg-green-700/20 border border-green-600 rounded-lg text-green-300 text-sm">
                                Message sent successfully! I&#39;ll get back to you soon.
                            </div>
                        )}
                        {submitStatus === 'error' && (
                            <div className="mb-4 p-3 bg-red-700/20 border border-red-600 rounded-lg text-red-300 text-sm">
                                Failed to send message. Please try again or contact me directly.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1">Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-neutral-200 placeholder-neutral-500"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">Email (Optional)</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-neutral-200 placeholder-neutral-500"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-1">Message <span className="text-red-500">*</span></label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={5}
                                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-neutral-200 placeholder-neutral-500"
                                    placeholder="Your message here..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-16 md:mt-20 pt-8 border-t border-neutral-800 text-center text-neutral-500">
                    <p className="font-mono text-sm">
                        © {new Date().getFullYear()} Michael Baterna. All rights reserved.
                    </p>
                     <p className="text-xs mt-1">Built with Next.js & Tailwind CSS. Hosted on Vercel.</p>
                </div>
            </div>
        </section>
    );
};

export default function Home() {
    return (
        <div className="bg-[#0a0a0a] text-neutral-100">
            <NavigationBar/>
            <OverviewSection/>
            <AboutMeSection/>
            <ProjectsSection />
            <TechnicalSkillsSection/>
            <CharacterSection/>
            <ContactSection/>
        </div>
    );
}