import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  Mail as MailIcon,
  Phone as PhoneIcon,
  MapPin as MapPinIcon,
  ExternalLink as ExternalLinkIcon,
  Code2 as Code2Icon,
  Award as AwardIcon,
  GraduationCap as GraduationCapIcon,
  Briefcase as BriefcaseIcon,
  User as UserIcon,
  Menu as MenuIcon,
  X as XIcon,
  ChevronDown as ChevronDownIcon,
  Sparkles as SparklesIcon,
  Users as UsersIcon,
  Calendar as CalendarIcon,
  ArrowUpRight as ArrowUpRightIcon,
  Trophy as TrophyIcon,
  Globe as GlobeIcon
} from 'lucide-react'
import {
  personalInfo,
  summary,
  education,
  projects,
  skills,
  experience,
  awards,
  volunteer,
  organiser,
  languages
} from './data/portfolio'
import './App.css'

/* ── Brand SVG Icons (not in lucide-react v1.8+) ── */
const GithubIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const LinkedinIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const TwitterIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
)

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  const navItems = [
    { id: 'home', label: 'Home', icon: UserIcon },
    { id: 'about', label: 'About', icon: SparklesIcon },
    { id: 'education', label: 'Education', icon: GraduationCapIcon },
    { id: 'projects', label: 'Projects', icon: Code2Icon },
    { id: 'skills', label: 'Skills', icon: Code2Icon },
    { id: 'experience', label: 'Experience', icon: BriefcaseIcon },
    { id: 'contact', label: 'Contact', icon: MailIcon }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id)
      const scrollPosition = window.scrollY + 150

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  const skillCategories = [...new Set(skills.map(s => s.category))]

  return (
    <div className="app">
      {/* Cursor glow effect */}
      <div
        className="cursor-glow"
        style={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
        }}
      />

      {/* Progress bar */}
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <motion.div
            className="logo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => scrollToSection('home')}
          >
            <img src={personalInfo.photo} alt={personalInfo.name} className="logo-photo" />
          </motion.div>

          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="mobile-menu"
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    className={`mobile-nav-item ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => scrollToSection(item.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div className="nav-indicator" layoutId="nav-indicator" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <motion.div className="hero-background" style={{ y: backgroundY }}>
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
          <div className="grid-pattern"></div>
        </motion.div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SparklesIcon size={14} />
            <span>Available for opportunities</span>
          </motion.div>

          <div className="hero-main">
            <div className="hero-text">
              <motion.h1
                className="hero-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Hi, I'm <span className="gradient-text">{personalInfo.name}</span>
              </motion.h1>

              <motion.p
                className="hero-subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {personalInfo.title}
              </motion.p>

              <motion.p
                className="hero-description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Building decentralized applications, AI-powered tools, and immersive VR experiences.
              </motion.p>

              <motion.div
                className="hero-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <button className="btn btn-primary" onClick={() => scrollToSection('projects')}>
                  View Projects
                  <ArrowUpRightIcon size={18} />
                </button>
                <button className="btn btn-secondary" onClick={() => scrollToSection('contact')}>
                  Get In Touch
                </button>
              </motion.div>

              <motion.div
                className="hero-social"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                  <GithubIcon size={20} />
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                  <LinkedinIcon size={20} />
                </a>
                <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="X / Twitter">
                  <TwitterIcon size={20} />
                </a>
                <a href={`mailto:${personalInfo.email}`} className="social-link" aria-label="Email">
                  <MailIcon size={20} />
                </a>
              </motion.div>
            </div>

            <motion.div
              className="hero-image-container"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="profile-image-wrapper">
                <img
                  src={personalInfo.photo}
                  alt={personalInfo.name}
                  className="profile-image"
                />
                <div className="profile-ring"></div>
                <div className="profile-glow"></div>
              </div>

              <div className="floating-badge badge-1">
                <Code2Icon size={16} />
                <span>Blockchain</span>
              </div>
              <div className="floating-badge badge-2">
                <TrophyIcon size={16} />
                <span>Hackathon Winner</span>
              </div>
            </motion.div>
          </div>

          <motion.button
            className="scroll-hint"
            onClick={() => scrollToSection('about')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{
              opacity: { delay: 1 },
              y: { delay: 1, repeat: Infinity, duration: 2, ease: "easeInOut" }
            }}
          >
            <ChevronDownIcon size={20} />
            <span>Scroll to explore</span>
          </motion.button>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <motion.div
          className="section-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <span className="section-label">About Me</span>
            <h2 className="section-title">Passionate Developer & Innovator</h2>
          </motion.div>

          <motion.p className="about-text" variants={itemVariants}>
            {summary}
          </motion.p>

          <motion.div className="info-grid" variants={itemVariants}>
            <div className="info-card">
              <div className="info-icon-wrapper">
                <MapPinIcon size={22} />
              </div>
              <div className="info-content">
                <span className="info-label">Location</span>
                <span className="info-value">Kolkata, India</span>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon-wrapper">
                <MailIcon size={22} />
              </div>
              <div className="info-content">
                <span className="info-label">Email</span>
                <span className="info-value">{personalInfo.email}</span>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon-wrapper">
                <PhoneIcon size={22} />
              </div>
              <div className="info-content">
                <span className="info-label">Phone</span>
                <span className="info-value">{personalInfo.phone}</span>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon-wrapper">
                <GlobeIcon size={22} />
              </div>
              <div className="info-content">
                <span className="info-label">Languages</span>
                <span className="info-value">{languages.join(', ')}</span>
              </div>
            </div>
          </motion.div>

          <motion.div className="stats-row" variants={itemVariants}>
            <div className="stat-item">
              <span className="stat-number">6+</span>
              <span className="stat-label">Projects Built</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">8+</span>
              <span className="stat-label">Hackathons</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">11+</span>
              <span className="stat-label">Technologies</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4</span>
              <span className="stat-label">Languages</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Education Section */}
      <section id="education" className="section education-section">
        <motion.div
          className="section-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <span className="section-label">Education</span>
            <h2 className="section-title">Academic Journey</h2>
          </motion.div>

          <div className="education-timeline">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                variants={itemVariants}
              >
                <div className="timeline-dot">
                  <GraduationCapIcon size={16} />
                </div>
                <div className="timeline-content">
                  <div className="timeline-period">{edu.period}</div>
                  <h3 className="timeline-title">{edu.institution}</h3>
                  <p className="timeline-degree">{edu.degree}</p>
                  <p className="timeline-description">{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects-section">
        <motion.div
          className="section-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <span className="section-label">Projects</span>
            <h2 className="section-title">Featured Work</h2>
          </motion.div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                className="project-card"
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                <div className="project-card-inner">
                  <div className="project-header">
                    <div className="project-icon">
                      <Code2Icon size={20} />
                    </div>
                    <div className="project-links">
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="Live demo">
                          <ExternalLinkIcon size={18} />
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="Source code">
                          <GithubIcon size={18} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="project-name">{project.name}</h3>
                  <span className="project-period">{project.period}</span>
                  <p className="project-description">{project.description}</p>

                  <div className="project-tags">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="project-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section skills-section">
        <motion.div
          className="section-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <span className="section-label">Skills</span>
            <h2 className="section-title">Technologies & Tools</h2>
          </motion.div>

          {skillCategories.map(category => (
            <motion.div key={category} className="skill-category" variants={itemVariants}>
              <h3 className="skill-category-title">{category}</h3>
              <div className="skills-list">
                {skills.filter(s => s.category === category).map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="skill-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section experience-section">
        <motion.div
          className="section-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <span className="section-label">Experience</span>
            <h2 className="section-title">Achievements & Activities</h2>
          </motion.div>

          <div className="experience-grid">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                className={`experience-card ${exp.highlight ? 'highlight' : ''}`}
                variants={itemVariants}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                {exp.highlight && <div className="highlight-badge"><TrophyIcon size={14} /> Top Achievement</div>}
                <h3 className="experience-title">{exp.title}</h3>
                <p className="experience-description">{exp.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Awards */}
          <motion.div className="subsection" variants={itemVariants}>
            <h3 className="subsection-title">
              <AwardIcon size={22} />
              Awards & Recognition
            </h3>
            <div className="awards-list">
              {awards.map((award, index) => (
                <motion.div
                  key={index}
                  className="award-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <TrophyIcon size={16} className="award-icon" />
                  <span>{award}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Volunteer & Organiser */}
          <div className="two-col-grid">
            <motion.div className="subsection" variants={itemVariants}>
              <h3 className="subsection-title">
                <UsersIcon size={22} />
                Volunteer
              </h3>
              <ul className="activity-list">
                {volunteer.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </motion.div>

            <motion.div className="subsection" variants={itemVariants}>
              <h3 className="subsection-title">
                <CalendarIcon size={22} />
                Organiser
              </h3>
              <ul className="activity-list">
                {organiser.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <motion.div
          className="section-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <span className="section-label">Contact</span>
            <h2 className="section-title">Let's Work Together</h2>
          </motion.div>

          <motion.p className="contact-description" variants={itemVariants}>
            Feel free to reach out for collaborations, opportunities, or just a friendly chat!
          </motion.p>

          <motion.div className="contact-grid" variants={itemVariants}>
            <a href={`mailto:${personalInfo.email}`} className="contact-card">
              <div className="contact-card-icon">
                <MailIcon size={28} />
              </div>
              <h4>Email</h4>
              <p>{personalInfo.email}</p>
            </a>
            <a href={`tel:${personalInfo.phone}`} className="contact-card">
              <div className="contact-card-icon">
                <PhoneIcon size={28} />
              </div>
              <h4>Phone</h4>
              <p>{personalInfo.phone}</p>
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-card-icon">
                <GithubIcon size={28} />
              </div>
              <h4>GitHub</h4>
              <p>View my code</p>
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-card-icon">
                <LinkedinIcon size={28} />
              </div>
              <h4>LinkedIn</h4>
              <p>Connect with me</p>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <img src={personalInfo.photo} alt={personalInfo.name} className="logo-photo" />
          </div>
          <p className="footer-text">
            &copy; {new Date().getFullYear()} {personalInfo.name}. Crafted with passion.
          </p>
          <div className="footer-social">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GithubIcon size={18} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedinIcon size={18} />
            </a>
            <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" aria-label="X / Twitter">
              <TwitterIcon size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
