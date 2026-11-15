import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import './App.css'
import malikPhoto from './assets/MALIK.jpeg'
import travelBanyuwangiImage from './assets/travel-banyuwangi.png'
import adminTravelImage from './assets/admin-travel-banyuwangi.png'
import stuntingMappingImage from './assets/pemetaan-madura.png'
import gerakanBahasaIsyaratImage from './assets/pengenalan-isyarat.png'
import ularTanggaImage from './assets/ular-tangga.png'
import museumCakraningratImage from './assets/museum-cakraningrat.png'

const projects = [
  {
    number: '01',
    title: 'Museum Cakraningrat',
    type: 'Website',
    description: 'Website yang menampilkan informasi tentang museum Cakraningrat di Bangkalan.',
    tech: 'Laravel · JavaScript · CSS · PHP',
    visualClass: 'project-visual-blue',
    image: museumCakraningratImage,
    year:'2024',
  },
  {
    number: '02',
    title: 'Travel Banyuwangi',
    type: 'Website',
    description: 'Website yang menunjukkan wisata alam yang ada di Banyuwangi, penyewaan hotel, dan transportasi.',
    tech: 'React · Node · Express · PostgreSQL',
    visualClass: 'project-visual-blue',
    image: travelBanyuwangiImage,
    year:'2025',
  },
  {
    number: '03',
    title: 'Pemetaan Stunting',
    type: 'Website',
    description: 'Website yang menampilkan data pemetaan stunting di wilayah Madura dari tahun 2020 hingga 2024.',
    tech: 'Python · Flask · Machine Learning · Json',
    visualClass: 'project-visual-green',
    image: stuntingMappingImage,
    year:'2025',
  },
  {
    number: '04',
    title: 'Admin Travel Banyuwangi',
    type: 'Website',
    description: 'Website yang menyediakan dashboard admin untuk mengelola data wisata di Banyuwangi, Hotel dan Transportasi.',
    tech: 'React · Node · Express · PostgreSQL',
    visualClass: 'project-visual-green',
    image: adminTravelImage,
    year:'2025',
  },
  {
    number: '05',
    title: 'Gerakan Bahasa Isyarat',
    type: 'Website',
    description: 'Website yang mengklasifikasikan video gerakan bahasa isyarat untuk mempermudah pembelajaran.',
    tech: 'Python · Flask · Machine Learning · Keras',
    visualClass: 'project-visual-green',
    image: gerakanBahasaIsyaratImage,
    year:'2026',
  },
  {
    number: '06',
    title: 'Permainan Ular Tangga',
    type: 'Game',
    description: 'Aplikasi permainan ular tangga yang dapat dimainkan oleh dua pemain dengan menggunakan C++.',
    tech: 'C++',
    visualClass: 'project-visual-green',
    image: ularTanggaImage,
    year:'2024',
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
      const direction = distance < 0 ? 1 : -1
      setActiveProject((current) =>
        direction === 1
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
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
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
          <h2>Tentang Saya.</h2>
          <p className="section-text">
            Saya adalah Lulusan S1 Teknik Informatika dari Universitas Trunodjoyo Madura. Saya memiliki pengalaman dalam mengembangkan website menggunakan berbagai teknologi seperti React, Node.js, Express, Laravel, dan Python. Saya memiliki pengalaman dalam membuat aplikasi web yang responsif dan user-friendly. Saya juga memiliki sertifikasi BNSP Junior Web Developer. Saya selalu berusaha untuk terus belajar dan mengembangkan kemampuan saya dalam bidang pengembangan web.
          </p>
        </div>
      </section>

      <section className="work-section reveal-section" id="work">
        <div className="section-heading">
          <p className="section-label"></p>
          <h2>Beberapa Project yang telah saya buat.</h2>
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
              const circularPosition =
                (index - activeProject + projects.length) % projects.length
              const position =
                circularPosition > projects.length / 2
                  ? circularPosition - projects.length
                  : circularPosition
              const distance = Math.abs(position)
              const isVisible = distance <= 2
              const positionClass = !isVisible
                ? position < 0
                  ? 'project-hidden-left'
                  : 'project-hidden-right'
                : position === 0
                  ? 'project-active'
                  : position < 0
                    ? 'project-side-left'
                    : 'project-side-right'
              const cardStyle: CSSProperties = {
                transform: isVisible
                  ? `translate3d(${position * 42}%, 0, 0) scale(${1 - distance * 0.08})`
                  : `translate3d(${position < 0 ? -112 : 112}%, 0, 0) scale(0.78)`,
                opacity: isVisible ? 1 - distance * 0.2 : 0,
                zIndex: isVisible ? projects.length - distance : 0,
              }

              return (
                <article
                  className={`project project-slide ${positionClass}`}
                  style={cardStyle}
                  key={project.number}
                >
                  <div className={`project-visual ${project.visualClass}`}>
                    {project.image && (
                      <img
                        className="project-image"
                        src={project.image}
                        alt={`Preview ${project.title}`}
                      />
                    )}
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

      <section className="skills-section reveal-section" id="skills">
        <div className="section-heading">
          <p className="section-label"></p>
          <h2>Keahlian yang saya kuasai.</h2>
        </div>
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
          <div className="skill-card">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" alt="MySQL" />
          </div>
          <div className="skill-card">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" />
          </div>
          <div className="skill-card">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
          </div>
          <div className="skill-card">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" alt="C++" />
          </div>
          <div className="skill-card">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" alt="Bootstrap" />
          </div>
          <div className="skill-card">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" alt="Spring Boot" />
          </div>
        </div>
      </section>

      <section className="experience-section reveal-section" id="experience">
        <div className="section-heading">
          <p className="section-label"></p>
          <h2>Experience.</h2>
        </div>
        <div className="experience-list">
          <article className="experience-card">
            <div>
              <p className="experience-type">Education</p>
              <h3>Asisten Praktikum</h3>
              <p>Mendampingi proses praktikum dan membantu mahasiswa memahami materi pemrograman.</p>
            </div>
          </article>
          <article className="experience-card experience-card-featured">
            <div>
              <p className="experience-type">Development</p>
              <h3>Fullstack Developer</h3>
              <p>Membangun aplikasi web dari sisi frontend hingga backend dengan pengalaman pengguna yang baik.</p>
            </div>
          </article>
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
          <a href="https://github.com/Lealwa" target="_blank" rel="noreferrer">
            <img src="https://cdn.simpleicons.org/github/fff8e8" alt="" /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/malik-maulana-1680b2313/" target="_blank" rel="noreferrer">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg" alt="" /> LinkedIn
          </a>
          <a href="https://www.instagram.com/malikk_maulanaa/" target="_blank" rel="noreferrer">
            <img src="https://cdn.simpleicons.org/instagram/fff8e8" alt="" /> Instagram
          </a>
          <a href="https://wa.me/6287750183548" target="_blank" rel="noreferrer">
            <img src="https://cdn.simpleicons.org/whatsapp/fff8e8" alt="" /> WhatsApp
          </a>
        </div>
        <a className="back-to-top" href="#home">Back to top <b>↑</b></a>
        <small>© 2026 Malik Maulana</small>
      </footer>
    </main>
  )
}

export default App