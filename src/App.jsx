import { useState, useEffect } from 'react'
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from 'react-icons/fa'

function App() {
  // Track active section for nav highlight
  const [activeSection, setActiveSection] = useState('home')

  // Scroll event handler to update active nav link
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100
      const sections = ['home', 'about', 'services', 'contact']
      for (const id of sections) {
        const elem = document.getElementById(id)
        if (elem) {
          const offsetTop = elem.offsetTop
          const offsetHeight = elem.offsetHeight
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll helper
  const scrollTo = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logo}>NISC</div>
        <nav style={styles.nav}>
          {['home', 'about', 'services', 'contact'].map((section) => (
            <button
              key={section}
              style={{
                ...styles.navLink,
                ...(activeSection === section ? styles.navLinkActive : {}),
              }}
              onClick={() => scrollTo(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </nav>
      </header>

      <main style={styles.main}>
        {/* Home / Hero */}
        <section id="home" style={{ ...styles.section, ...styles.hero }}>
          <h1 style={styles.heroTitle}>Welcome to NISC</h1>
          <p style={styles.heroSubtitle}>
            Naksh Innovation & Solutions Consultance — Empowering your business
            with innovative technology.
          </p>
          <button
            style={styles.heroButton}
            onClick={() => scrollTo('contact')}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#004bb5')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = '#0052cc')
            }
          >
            Contact Us
          </button>
        </section>

        {/* About */}
        <section id="about" style={styles.section}>
          <h2 style={styles.sectionTitle}>About Us</h2>
          <p style={styles.sectionText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            lacinia, lorem at blandit condimentum, justo erat cursus nunc, nec
            condimentum magna turpis sed augue. Sed a nibh vehicula, lobortis
            nunc a, malesuada orci. Curabitur pulvinar felis ut sapien
            faucibus, at varius lacus dapibus.
          </p>
        </section>

        {/* Services */}
        <section id="services" style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Services</h2>
          <ul style={styles.servicesList}>
            <li>Business Consulting</li>
            <li>Technology Solutions</li>
            <li>Custom Software Development</li>
            <li>Support & Maintenance</li>
          </ul>
        </section>

        {/* Contact */}
        <section id="contact" style={styles.section}>
          <h2 style={styles.sectionTitle}>Contact Us</h2>
          <p style={styles.sectionText}>
            Interested in working together? Reach out to us through any of the
            platforms below or send a message directly.
          </p>
          <form
            style={styles.contactForm}
            onSubmit={(e) => {
              e.preventDefault()
              alert('Thank you for contacting NISC!')
              e.target.reset()
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              style={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              style={styles.input}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              style={styles.textarea}
            />
            <button type="submit" style={styles.submitButton}>
              Send Message
            </button>
          </form>
        </section>
      </main>

      <footer style={styles.footer}>
        <div style={styles.socialIcons}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialLink}
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialLink}
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialLink}
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialLink}
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialLink}
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>
        <p style={styles.footerText}>
          © 2025 NISC - Naksh Innovation & Solutions Consultance
        </p>
      </footer>
    </div>
  )
}

const styles = {
  page: {
    fontFamily:
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#222',
    backgroundColor: '#fff',
    scrollBehavior: 'smooth',
  },
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    borderBottom: '1px solid #ddd',
    zIndex: 1000,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0052cc',
    cursor: 'default',
  },
  nav: {
    display: 'flex',
    gap: 25,
  },
  navLink: {
    background: 'none',
    border: 'none',
    fontSize: 16,
    cursor: 'pointer',
    color: '#555',
    fontWeight: 500,
    padding: '5px 0',
    position: 'relative',
    transition: 'color 0.3s ease',
  },
  navLinkActive: {
    color: '#0052cc',
    fontWeight: '700',
    borderBottom: '2px solid #0052cc',
  },
  main: {
    padding: '40px 30px',
    maxWidth: 900,
    margin: 'auto',
  },
  section: {
    marginBottom: 80,
    opacity: 0,
    transform: 'translateY(40px)',
    animation: 'fadeUp 0.8s forwards',
    animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  hero: {
    textAlign: 'center',
    padding: '100px 20px',
    backgroundColor: '#f9fbff',
    borderRadius: 12,
    opacity: 0,
    transform: 'translateY(40px)',
    animation: 'fadeUp 1s forwards',
    animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  heroTitle: {
    fontSize: 48,
    marginBottom: 20,
    color: '#0052cc',
  },
  heroSubtitle: {
    fontSize: 20,
    marginBottom: 30,
    color: '#444',
  },
  heroButton: {
    padding: '14px 32px',
    fontSize: 18,
    backgroundColor: '#0052cc',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  sectionTitle: {
    fontSize: 32,
    marginBottom: 25,
    color: '#003d99',
    borderBottom: '3px solid #0052cc',
    display: 'inline-block',
    paddingBottom: 5,
  },
  sectionText: {
    fontSize: 18,
    maxWidth: 700,
    margin: '0 auto',
    color: '#333',
    lineHeight: 1.5,
  },
  servicesList: {
    listStyle: 'disc',
    paddingLeft: 30,
    maxWidth: 600,
    margin: '0 auto',
    fontSize: 18,
    color: '#333',
  },
  contactForm: {
    maxWidth: 600,
    margin: '20px auto 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  input: {
    padding: 14,
    fontSize: 16,
    borderRadius: 8,
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  textarea: {
    padding: 14,
    fontSize: 16,
    borderRadius: 8,
    border: '1px solid #ccc',
    minHeight: 120,
    resize: 'vertical',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  submitButton: {
    padding: '14px 0',
    fontSize: 18,
    backgroundColor: '#0052cc',
    border: 'none',
    borderRadius: 8,
    color: '#fff',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  footer: {
    backgroundColor: '#f5f7fa',
    textAlign: 'center',
    padding: 30,
    borderTop: '1px solid #ddd',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    marginTop: 15,
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: 25,
    fontSize: 24,
    color: '#0052cc',
  },
  socialLink: {
    color: '#0052cc',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
  },

  // Add keyframe animation in a style tag below, since inline styles can't do @keyframes
}

// Because inline styles can’t do keyframes, we add the keyframe CSS via a style tag:
const styleSheet = `
@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`

export default function WrappedApp() {
  useEffect(() => {
    const styleTag = document.createElement('style')
    styleTag.textContent = styleSheet
    document.head.appendChild(styleTag)
    return () => {
      document.head.removeChild(styleTag)
    }
  }, [])

  return <App />
}
