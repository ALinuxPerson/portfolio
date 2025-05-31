'use client'

import React, {useState, useEffect} from "react";
import Image from "next/image";
import {FaGithub, FaLinkedin, FaFacebook, FaReddit} from "react-icons/fa";
import emailjs from '@emailjs/browser';

const sections = [
    {id: 'overview', label: 'overview'},
    {id: 'about-me', label: 'about me'},
    {id: 'character', label: 'character'},
    {id: 'technical-skills', label: 'technical skills'},
    {id: 'contact', label: 'contact'}
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
    },
    {
        icon: FaFacebook,
        label: 'Facebook',
        href: 'https://www.facebook.com/michael.baterna.5'
    },
    {
        icon: FaReddit,
        label: 'Reddit',
        href: 'https://www.reddit.com/user/ALinuxPerson'
    }
]

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
            className="z-30 fixed top-0 w-full px-6 py-4 flex justify-between bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-neutral-800">
            <div className="flex items-center">
                <span className="font-mono font-bold text-[#ededed]">
                    michael baterna
                    <span
                        className="inline-block w-[0.5em] h-[1.1em] ml-[2px] animate-[blink_1s_steps(2)_infinite]">_</span>
                </span>
            </div>
            <div className="flex gap-6">
                {sections.map(({id, label}) => (
                    <a
                        key={id}
                        href={`#${id}`}
                        className={`font-mono transition-colors ${
                            activeSection === id ? 'text-neutral-100 font-bold' : 'text-neutral-400 hover:text-neutral-200'
                        }`}
                    >
                        {label}
                    </a>
                ))}
            </div>
        </nav>
    )
}

const OverviewSection = () => {
    const [isHoveringBg, setIsHoveringBg] = useState(false)
    const [showOnlinePersona, setShowOnlinePersona] = useState(false)
    const personas = {
        personal: {
            name: "michael baterna",
            image: "/profile-picture.jpg",
        },
        online: {
            name: "ALinuxPerson",
            image: "/ALinuxPerson.png",
        },
    };
    const togglePersona = () => setShowOnlinePersona((prev) => !prev);

    return (
        <div
            id="overview"
            className="relative min-h-screen overflow-hidden"
            onMouseEnter={() => setIsHoveringBg(true)}
            onMouseLeave={() => setIsHoveringBg(false)}
        >
            {/* Background */}
            <div
                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                    isHoveringBg ? 'opacity-40 scale-105' : 'opacity-25 scale-100'
                }`}
                style={{
                    backgroundImage: 'url("/hero-background.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black/70"/>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 min-h-screen flex items-center px-8 py-40">
                <div
                    className="w-full max-w-8xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
                    <div
                        className="flex-shrink-0 transform hover:scale-105 transition-transform duration-500 cursor-pointer"
                        onClick={togglePersona}>
                        <div
                            className="w-64 h-64 md:w-96 md:h-96 rounded-full border-8 border-neutral-800/50 overflow-hidden shadow-2xl ring-4 ring-neutral-700/30 ring-offset-8 ring-offset-[#0a0a0a]">
                            <Image
                                src={showOnlinePersona ? personas.online.image : personas.personal.image}
                                alt={showOnlinePersona ? personas.online.name : personas.personal.name}
                                className="w-full h-full object-cover"
                                width={384}
                                height={384}
                                priority
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
                        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-neutral-200 to-neutral-400 bg-clip-text text-transparent drop-shadow-lg cursor-pointer transition-opacity duration-500"
                            onClick={togglePersona}>
                            {showOnlinePersona ? personas.online.name : personas.personal.name}
                        </h1>
                        <div className="space-y-3">
                            <p className="text-2xl md:text-3xl text-neutral-300">18 years old.</p>
                            <p className="text-2xl md:text-3xl text-neutral-300">
                                software developer, <span className="italic text-neutral-400">in development.</span>
                            </p>
                            <p className="text-2xl md:text-3xl text-neutral-300">
                                <span className="font-bold text-neutral-200">curious</span>,{" "}
                                <span className="font-bold text-neutral-200">open-minded</span>, and{" "}
                                <span className="font-bold text-neutral-200">ambitious</span>{"."}
                            </p>
                        </div>
                        <p className="font-mono italic text-lg mt-6 text-neutral-400">what&apos;s more to give?</p>


                        {/* Social Links */}
                        <div className="pointer-events-auto flex gap-6 mt-8">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-neutral-400 hover:text-neutral-200 transition-colors duration-200"
                                >
                                    <link.icon className="w-6 h-6"/>
                                    <span className="text-lg font-medium">{link.label}</span>
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
        <section id="about-me" className="bg-[#0a0a0a] py-20">
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* First column (25%) */}
                    <div className="md:w-1/4 flex flex-col items-center justify-center gap-6">
                        <Image
                            src="/wait-a-minute-who-are-you.gif"
                            alt="wait a minute... who are you?"
                            className="w-full max-w-[300px] rounded-lg"
                            width={300} // from max-w-[300px]
                            height={169}
                        />
                        <p className="font-mono italic text-neutral-200 text-xl text-center">
                            &quot;wait, who are you anyway?&quot;
                        </p>
                    </div>

                    {/* Second column (75%) */}
                    <div className="md:w-3/4 text-neutral-300 space-y-6">
                        <p className="leading-relaxed">
                            Hello! I&#39;m <b>Michael C. Baterna</b>, otherwise known by my online handle as <b>ALinuxPerson</b> (even though I use a Mac now). I have a deep and undying love for computers, technology, and software development—even as a young child—and see them as tools that can change the world for the better despite their many challenges. I specialize in making desktop-oriented applications and embedded programming, but I&#39;m not afraid to dabble in the occasional web and game development.
                        </p>

                        <p className="leading-relaxed">
                            I believe there is a logical and scientific explanation for everything in this world, even for things that cannot be solved with the scientific method. Because of this belief, I have become a naturally curious and logical thinker, which drew me to software development like flies to an apple pie. when I&#39;m not developing <i>The Next Big Thing™</i>, I&#39;m typically out enjoying nature and going on walks. And when i&#39;m stuck inside my house, I dabble in some casual gaming, such as Minecraft, Deltarune, and others.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

const CharacterSection = () => {
    const characteristics = [
        {
            title: "Curious",
            description: "In this world, there will always be something that you just don't know. So why not have the drive to learn as much as possible? We've only got one life. I don't settle with surface-level understanding--I MUST understand how something works.",
            image: "/curious.gif",
            width: 256,
            height: 64
        },
        {
            title: "Open-minded",
            description: "This goes hand in hand with being curious. New ideas are being invented everyday. Therefore, I'm willing to understand and to compromise with other people because you're going against an AVALANCHE of new beliefs, frameworks, and philosophies. Diversity is what keeps humans, human. Therefore, it's important to be open-minded.",
            image: "/open-minded.gif",
            width: 256,
            height: 64
        },
        {
            title: "Ambitious",
            description: "DON'T LET YOUR DREAMS BE DREAMS! Every time you let go of an idea you're letting go of an entire fountain of opportunity. Words are just words, DO THEM! TAKE ACTION! The Steve Jobs' and the Bill Gates' didn't invent Apple and Microsoft by just sitting around, did they?",
            image: "/ambitious.gif",
            width: 256,
            height: 64
        }
    ];

    return (
        <section id="character" className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Right column (25%) - Characteristics */}
                    <div className="md:w-3/4 space-y-8">
                        {characteristics.map((char) => (
                            <div
                                key={char.title}
                                className="characteristic-card bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-lg border border-gray-200 transform hover:scale-105 transition-transform duration-300 flex items-center gap-4"
                            >
                                <Image src={char.image} alt={char.title} className="w-64 h-16 rounded-md shadow-md" width={char.width} height={char.height} />
                                <div>
                                    <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                        {char.title}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {char.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Left column (75%) - Meme and Quote */}
                    <div className="md:w-1/4 flex flex-col items-center justify-center">
                        <Image
                            src="/the-office-eli5.gif"
                            alt="why don't you explain this to me like i'm 5?"
                            className="w-full max-w-[600px] rounded-lg shadow-lg mb-6"
                            width={600}
                            height={338}
                        />
                        <p className="font-mono italic text-gray-700 text-xl text-center">
                            &quot;curious, open-minded, and ambitious... can you explain what that means?&quot;
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const TechnicalSkillsSection = () => {
    const skills = [
        {
            image: "/rust-logo.png",
            title: "Rust Development",
            description: `I am a proficient Rust developer with four years of experience, having created multiple open-source crates, including \`mcsoft_auth\`, \`build_script\`, and \`try-drop\`, among others.`,
            width: 192,
            height: 192
        },
        {
            image: "/python-logo.png",
            title: "Python Development",
            description: `While Rust is my primary language, I am also skilled in Python development. One example is \`oom-notifier\`, a utility for Linux that alerts you when the OOM (Out of Memory) score of processes becomes too high.`,
            width: 192,
            height: 192
        },
        {
            image: "/os-api-logo.png",
            title: "OS-Specific API Development",
            description: `Despite what my GitHub handle might suggest, I also have experience developing software for both Windows and macOS in addition to Linux, leveraging platform-specific APIs when needed.`,
            width: 192,
            height: 192
        },
    ];

    return (
        <section id="technical-skills" className="bg-black py-20 text-white">
            <div className="text-center font-mono italic text-2xl mb-12">
                &#34;alright, but what can you do?&#34;
            </div>
            <div className="flex flex-wrap justify-center gap-12">
                {skills.map((skill) => (
                    <div key={skill.title} className="flex flex-col items-center text-center max-w-xs">
                        <Image src={skill.image} alt={skill.title} className="w-48 h-48 mb-4" width={skill.width} height={skill.height}/>
                        <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                        <p className="text-gray-300">{skill.description}</p>
                    </div>
                ))}
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
    const [submitStatus, setSubmitStatus] = useState('');

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
                    email: formData.email,
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
        <section id="contact" className="bg-[#0a0a0a] py-20">
            <div className="max-w-7xl mx-auto px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-mono font-bold italic text-neutral-200 mb-4">&#34;...how can i get in touch with you?&#34;</h2>
                    <p className="text-neutral-400 font-mono">i&#39;m glad you&#39;ve asked.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-6">
                        <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800">
                            <h3 className="text-xl font-bold text-neutral-200 mb-4">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-neutral-400 hover:text-neutral-200 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                    <a href="mailto:contact@example.com">micheal02052007@gmail.com</a>
                                </div>
                                <div className="flex items-center gap-3 text-neutral-400 hover:text-neutral-200 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                    <span>+63 (905) 407-1975</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800">
                            <h3 className="text-xl font-bold text-neutral-200 mb-4">Connect with Me</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-neutral-400 hover:text-neutral-200 transition-colors duration-200 p-2 rounded-lg hover:bg-neutral-800/30"
                                    >
                                        <link.icon className="w-5 h-5"/>
                                        <span className="font-medium">{link.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800">
                        <h3 className="text-xl font-bold text-neutral-200 mb-4">Send a Message</h3>

                        {/* Status Messages */}
                        {submitStatus === 'success' && (
                            <div className="mb-4 p-3 bg-green-900/50 border border-green-700 rounded-lg text-green-200">
                                Message has been sent successfully! I will get back to you as soon as possible.
                            </div>
                        )}
                        {submitStatus === 'error' && (
                            <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
                                Failed to send the message. Please try again later or contact me directly.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-neutral-400 mb-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-600 text-neutral-200"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-neutral-400 mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-600 text-neutral-200"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-neutral-400 mb-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-600 text-neutral-200"
                                    placeholder="Your message..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-neutral-700 hover:bg-neutral-600 text-neutral-200 font-medium rounded-lg transition-colors duration-200"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-neutral-800 text-center text-neutral-400">
                    <p className="font-mono">
                        © {new Date().getFullYear()} Michael Baterna. all rights reserved.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default function Home() {
    return (
        <div>
            <OverviewSection/>
            <AboutMeSection/>
            <CharacterSection/>
            <TechnicalSkillsSection/>
            <ContactSection/>
            <NavigationBar/>
        </div>
    );
}
