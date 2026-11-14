import { useEffect, useRef, useState, type PointerEvent } from 'react'
import './App.css'
import malikPhoto from './assets/MALIK.jpeg'

const projects = [
  {
    number: '01',
    title: 'Museum Cakraningrat',
    type: 'Website',
    description: 'Website yang menampilkan informasi tentang museum Cakraningrat di Bangkalan.',
    tech: 'Laravel · JavaScript · CSS · PHP',
    visualClass: 'project-visual-orange',
    year:'2024',
  },
  {
    number: '02',
    title: 'Travel Banyuwangi',
    type: 'Website',
    description: 'Website yang menunjukkan wisata alam yang ada di Banyuwangi, penyewaan hotel, dan transportasi.',
    tech: 'React · Node · Express · PostgreSQL',
    visualClass: 'project-visual-blue',
    year:'2025',
  },
  {
    number: '03',
    title: 'Pemetaan Stunting',
    type: 'Website',
    description: 'Website yang menampilkan data pemetaan stunting di wilayah Madura dari tahun 2020 hingga 2024.',
    tech: 'Python · Flask · Machine Learning · Json',
    visualClass: 'project-visual-green',
    year:'2025',
  },
]

function App() {

  const [activeProject, setActiveProject] = useState(0)
  const [autoPlayKey, setAutoPlayKey] = useState(0)

  useEffect(() => {
    const sections = document.querySelectorAll('.reveal-section')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveProject((current) => (current + 1) % projects.length)
    }, 10000)

    return () => window.clearInterval(timer)
  }, [autoPlayKey])

  const dragStartX = useRef<number | null>(null)

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStartX.current = event.clientX
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return

    const distance = event.clientX - dragStartX.current
    if (Math.abs(distance) > 50) {
      setActiveProject((current) =>
        distance < 0
          ? (current + 1) % projects.length
          : current === 0
            ? projects.length - 1
            : current - 1,
      )
      setAutoPlayKey((current) => current + 1)
    }

    dragStartX.current = null
  }
  
  return (
    <main>
      <nav className="navbar">
        <a className="brand" href="#home" aria-label="Kembali ke beranda">
          <span className="brand-mark">MM</span>
          <span className="brand-name">Malik Maulana</span>
        </a>

        <div className="nav-links">
          <a href="#about"> About</a>
          <a href="#work"> Work</a>
          <a href="#contact"> Contact</a>
        </div>

        <a className="nav-button" href="#contact">
          <span>Let's talk</span>
          <b>↗</b>
        </a>
      </nav>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">Fullstack Developer · Indonesia</p>
          <h1>
            Building digital
            <span> experiences.</span>
          </h1>
          <p className="hero-description">
            Halo, saya <strong>Malik Maulana</strong>. Saya membantu brand dan
            bisnis membangun website yang cepat, berkarakter, dan mudah
            digunakan.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="#work">Explore my work <span>↗</span></a>
            <a className="text-link" href="#contact">Let's connect</a>
          </div>

          <div className="hero-stats">
            <div>
              <strong>03</strong>
              <span>Selected projects</span>
            </div>
            <div>
              <strong>02+</strong>
              <span>Years learning</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-card">
            <img
              className="profile-photo"
              src={malikPhoto}
              alt="Foto profil Malik Maulana"
            />
            <div className="visual-overlay">
              <span>Malik Maulana</span>
              <span>Creative developer ↗</span>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee" aria-label="Keahlian Malik Maulana">
        <div className="marquee-track">
          <span>Design with purpose</span><b>✦</b>
          <span>Build with curiosity</span><b>✦</b>
          <span>Make it memorable</span><b>✦</b>
          <span>Design with purpose</span><b>✦</b>
        </div>
      </div>

      <section className="intro-section reveal-section" id="about">
        <p className="section-label"></p>
        <div>
          <h2>Saya mengubah ide menjadi pengalaman digital yang berarti.</h2>
          <p className="section-text">
            Saya adalah developer yang membangun aplikasi dari sisi backend hingga frontend, dengan perhatian khusus pada visual design dan detail kecil yang membuat sebuah produk terasa lebih hidup. Saat tidak menulis kode, saya biasanya mencari inspirasi dari internet untuk kebutuhan desain.
          </p>
        </div>
      </section>

      <section className="work-section reveal-section" id="work">
        <div className="section-heading">
          <p className="section-label"></p>
          <h2>Beberapa karya pilihan.</h2>
        </div>

        <div
          className="project-slider"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            dragStartX.current = null
          }}
          aria-label="Project portfolio, geser untuk melihat project lain"
        >
          <div className="project-stack">
            {projects.map((project, index) => {
              const position =
                (index - activeProject + projects.length) % projects.length

              return (
                <article
                  className={`project project-slide project-position-${position}`}
                  key={project.number}
                >
                  <div className={`project-visual ${project.visualClass}`}>
                    <strong>{project.title.split(' ')[0]}</strong>
                  </div>

                  <div className="project-info">
                    <p className="project-type">{project.type}</p>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-meta">
                      <small>{project.tech}</small>
                      <span>{project.year}</span>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="skills-section reveal-section">
        <p className="section-label"></p>
        <div className="skills">
          <div className="skill-card skill-card-featured">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" />
          </div>
          <div className="skill-card">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" alt="Node.js" />
          </div>
          <div className="skill-card skill-card-express">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" alt="Express" />
          </div>
          <div className="skill-card">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="JavaScript" />
          </div>
          <div className="skill-card">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" alt="Laravel" />
          </div>
          <div className="skill-card">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" />
          </div>
        </div>
      </section>

      <section className="testimonial-section reveal-section">
        <p className="section-label"></p>
        <blockquote>
          “Malik punya cara yang unik untuk mengubah ide sederhana menjadi
          pengalaman digital yang terasa hidup dan mudah digunakan.”
        </blockquote>
        <p className="testimonial-author">— Client collaboration</p>
      </section>

      <section className="contact-section reveal-section" id="contact">
        <p className="section-label"></p>
        <h2>Punya ide untuk dikerjakan bersama?</h2>
        <a className="email-link" href="mailto:malikkmaulanaa16@gmail.com">
          malikkmaulanaa16@gmail.com ↗
        </a>
      </section>

      <footer>
        <div className="footer-intro">
          <strong>MM.</strong>
          <span>Building digital experiences<br />with curiosity & care.</span>
        </div>
        <div className="footer-links">
          <a href="https://github.com/Lealwa" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/malik-maulana-1680b2313/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="https://www.instagram.com/malikk_maulanaa/" target="_blank" rel="noreferrer">Instagram ↗</a>
        </div>
        <a className="back-to-top" href="#home">Back to top <b>↑</b></a>
        <small>© 2026 Malik Maulana</small>
      </footer>
    </main>
  )
}

export default App