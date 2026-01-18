'use client'

import { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'

export default function Home() {
  const [navOpen, setNavOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  useEffect(() => {
    // Load Typed.js dynamically
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.10/typed.min.js'
    script.async = true
    
    script.onload = () => {
      // @ts-ignore - Typed.js library
      if (window.Typed) {
        // @ts-ignore
        new window.Typed('.hero-content__subtitle-input', {
          strings: [': ', 'Data Engineer', 'SQL Server DBA', 'ETL Developer', 'Azure Architect'],
          typeSpeed: 70,
          backSpeed: 50,
          loop: true
        })
      }
    }
    
    document.body.appendChild(script)
    
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const toggleNav = () => {
    setNavOpen(!navOpen)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // EmailJS configuration
    // Replace these with your EmailJS credentials from emailjs.com

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Jaime Abad',
      }
      
      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      
      alert('Thank you for your message! I will get back to you soon.')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('EmailJS error:', error)
      alert('Failed to send message. Please try again or contact me directly at your.email@example.com')
    }
  }

  return (
    <div className="hero">
      <div className="hero__wrapper">
        <header className="header">
          <div className="logo">
            <div className="logo__icon">
              <i className="fa-solid fa-a"></i>
            </div>
            <div className="logo__text">My Portfolio</div>
          </div>
          
          <nav>
            <div className="nav__toggle" onClick={toggleNav}>
              <span className="nav__toggle-bar"></span>
              <span className="nav__toggle-bar"></span>
              <span className="nav__toggle-bar"></span>
            </div>
            <ul className={`nav__links ${navOpen ? 'nav__links--open' : ''}`}>
              <li className="nav__item">
                <a href="#home" className="nav__link">Home</a>
              </li>
              <li className="nav__item">
                <a href="#about" className="nav__link">About</a>
              </li>
              <li className="nav__item">
                <a href="#projects" className="nav__link">Projects</a>
              </li>
              <li className="nav__item">
                <a href="#blog" className="nav__link">Blog</a>
              </li>
              <li className="nav__item">
                <a href="#contact" className="nav__link">Contact</a>
              </li>
            </ul>
          </nav>
        </header>

        <div className="container">
          <div className="hero-image">
            <img 
              src="/paella_20190420.jpg" 
              alt="Jaime Abad" 
              className="hero-image__img"
            />
          </div>

          <div className="hero-content">
            <h5 className="hero-content__subtitle">
              Hi! I am <span className="hero-content__subtitle-input">: </span>
            </h5>
            <h1 className="hero-content__title">Jaime Abad</h1>
            <p className="hero-content__description">
              IT Professional with 8+ years of experience in SQL Server administration, data modeling, 
              and ETL development. Expert in database design, CI/CD pipelines, Azure architecture, and 
              full-stack development. Proven ability to deliver scalable data solutions and collaborate 
              with multidisciplinary teams.
            </p>

            <div className="button-group">
              <a 
                href="/JaimeAbad_CV_2026.pdf" 
                download="JaimeAbad_CV_2026.pdf"
                className="button-group__btn button-group__btn--active"
              >
                <i className="fas fa-file-pdf"></i> CV (PDF)
              </a>
              <a 
                href="/JaimeAbad_CV_2026.docx" 
                download="JaimeAbad_CV_2026.docx"
                className="button-group__btn"
              >
                <i className="fas fa-file-word"></i> CV (DOCX)
              </a>
              <a href="#contact" className="button-group__btn">
                Contact
              </a>
            </div>

            <div className="social-icons">
              <a href="https://www.linkedin.com/in/jaime-abad" target="_blank" rel="noopener noreferrer" className="social-icons__link">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://github.com/abadAfonsoJaime" target="_blank" rel="noopener noreferrer" className="social-icons__link">
                <i className="fab fa-github"></i>
              </a>
              <a href="mailto:jaime.abad.work@gmail.com" className="social-icons__link">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="about">
        <div className="hero__wrapper">
          <h2 className="about__title">About Me</h2>
          <div className="about__content">
            <div className="about__text">
              <p className="about__description">
                IT Professional with over 8 years of experience specializing in SQL Server database administration, 
                data modeling, and ETL development. I design, implement, and maintain robust database solutions including 
                user management, permissions, backups, and T-SQL stored procedures. My expertise extends to building 
                ETL processes with SSIS and Azure Data Factory, implementing CI/CD pipelines with Azure DevOps and PowerShell.
              </p>
              <p className="about__description">
                Throughout my career, I've collaborated with multidisciplinary teams to gather business requirements and 
                deliver scalable solutions. My experience spans Azure architecture, ARM Templates, Infrastructure as Code, 
                Office 365 administration, SharePoint, Power Platform, Appian BPM, and full-stack development. I'm passionate 
                about empowering business users through well-designed data solutions and digital transformation initiatives.
              </p>
            </div>
            <div className="about__skills">
              <h3 className="about__skills-title">Technical Skills</h3>
              <div className="skill-list">
                <div className="skill-list__item">
                  <span className="skill-list__name">SQL Server / T-SQL / Database Administration</span>
                  <div className="skill-list__bar">
                    <div className="skill-list__progress skill-list__progress--95"></div>
                  </div>
                </div>
                <div className="skill-list__item">
                  <span className="skill-list__name">ETL (SSIS / Azure Data Factory)</span>
                  <div className="skill-list__bar">
                    <div className="skill-list__progress skill-list__progress--90"></div>
                  </div>
                </div>
                <div className="skill-list__item">
                  <span className="skill-list__name">Azure DevOps / CI/CD / PowerShell</span>
                  <div className="skill-list__bar">
                    <div className="skill-list__progress skill-list__progress--85"></div>
                  </div>
                </div>
                <div className="skill-list__item">
                  <span className="skill-list__name">Azure Architecture / ARM Templates / IaC</span>
                  <div className="skill-list__bar">
                    <div className="skill-list__progress skill-list__progress--85"></div>
                  </div>
                </div>
                <div className="skill-list__item">
                  <span className="skill-list__name">Full-Stack (React / Node.js / SharePoint)</span>
                  <div className="skill-list__bar">
                    <div className="skill-list__progress skill-list__progress--80"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="hero__wrapper">
          <h2 className="projects__title">Featured Projects</h2>
          <p className="projects__subtitle">Some of my recent work</p>
          <div className="projects__grid">
            <div className="project-card">
              <div className="project-card__image">
                <img src="/paella_20190420.jpg" alt="Project 1" className="project-card__img" />
                <div className="project-card__overlay">
                  <a href="#" className="project-card__link">
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                  <a href="#" className="project-card__link">
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
              <div className="project-card__content">
                <h3 className="project-card__title">Enterprise Data Warehouse Architecture</h3>
                <p className="project-card__description">
                  Designed and built comprehensive data warehouse solutions from scratch, including SQL Server 
                  database modeling, stored procedures, and ETL pipelines. Implemented CI/CD deployment using 
                  Azure DevOps and PowerShell for automated infrastructure provisioning.
                </p>
                <div className="project-card__tags">
                  <span className="project-card__tag">SQL Server</span>
                  <span className="project-card__tag">Azure Data Factory</span>
                  <span className="project-card__tag">Azure DevOps</span>
                  <span className="project-card__tag">ARM Templates</span>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__image">
                <img src="/paella_20190420.jpg" alt="Project 2" className="project-card__img" />
                <div className="project-card__overlay">
                  <a href="#" className="project-card__link">
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                  <a href="#" className="project-card__link">
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
              <div className="project-card__content">
                <h3 className="project-card__title">Office 365 Digital Transformation</h3>
                <p className="project-card__description">
                  Led digital transformation initiatives on Office 365 and Azure platform. Administered SharePoint 
                  site collections, developed custom SPFX solutions, created Power Apps for business processes, 
                  and integrated Power Automate workflows for process automation.
                </p>
                <div className="project-card__tags">
                  <span className="project-card__tag">SharePoint</span>
                  <span className="project-card__tag">SPFX</span>
                  <span className="project-card__tag">Power Platform</span>
                  <span className="project-card__tag">Azure</span>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__image">
                <img src="/paella_20190420.jpg" alt="Project 3" className="project-card__img" />
                <div className="project-card__overlay">
                  <a href="#" className="project-card__link">
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                  <a href="#" className="project-card__link">
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
              <div className="project-card__content">
                <h3 className="project-card__title">Salesforce NPSP Integration & ETL</h3>
                <p className="project-card__description">
                  Delivered Salesforce NPSP solutions including data object customization, API REST integrations, 
                  and ETL processes with SSIS and Azure Data Factory. Collaborated with stakeholders to gather 
                  requirements and implement MVP solutions using agile methodologies.
                </p>
                <div className="project-card__tags">
                  <span className="project-card__tag">Salesforce</span>
                  <span className="project-card__tag">SSIS</span>
                  <span className="project-card__tag">API REST</span>
                  <span className="project-card__tag">SOQL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="blog">
        <div className="hero__wrapper">
          <h2 className="blog__title">Latest Blog Posts</h2>
          <p className="blog__subtitle">Thoughts on web development and technology</p>
          <div className="blog__grid">
            <article className="blog-card">
              <div className="blog-card__header">
                <span className="blog-card__date">
                  <i className="far fa-calendar"></i> January 15, 2026
                </span>
                <span className="blog-card__category">Azure</span>
              </div>
              <h3 className="blog-card__title">
                <a href="#" className="blog-card__link">Building CI/CD Pipelines for Azure Data Factory</a>
              </h3>
              <p className="blog-card__excerpt">
                Learn how to implement continuous integration and deployment for your Azure Data Factory 
                pipelines using Azure DevOps, ARM templates, and PowerShell automation.
              </p>
              <div className="blog-card__footer">
                <span className="blog-card__reading-time">
                  <i className="far fa-clock"></i> 8 min read
                </span>
                <a href="#" className="blog-card__read-more">
                  Read More <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </article>

            <article className="blog-card">
              <div className="blog-card__header">
                <span className="blog-card__date">
                  <i className="far fa-calendar"></i> January 10, 2026
                </span>
                <span className="blog-card__category">Database</span>
              </div>
              <h3 className="blog-card__title">
                <a href="#" className="blog-card__link">SQL Server Performance Tuning Best Practices</a>
              </h3>
              <p className="blog-card__excerpt">
                Explore essential techniques for optimizing SQL Server performance, including index strategies, 
                query optimization, and execution plan analysis for enterprise-scale databases.
              </p>
              <div className="blog-card__footer">
                <span className="blog-card__reading-time">
                  <i className="far fa-clock"></i> 10 min read
                </span>
                <a href="#" className="blog-card__read-more">
                  Read More <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </article>

            <article className="blog-card">
              <div className="blog-card__header">
                <span className="blog-card__date">
                  <i className="far fa-calendar"></i> January 5, 2026
                </span>
                <span className="blog-card__category">Data Engineering</span>
              </div>
              <h3 className="blog-card__title">
                <a href="#" className="blog-card__link">Modern ETL: SSIS vs Azure Data Factory</a>
              </h3>
              <p className="blog-card__excerpt">
                Compare traditional SSIS and cloud-native Azure Data Factory for ETL workflows. 
                Discover when to use each tool and how to migrate existing SSIS packages to ADF.
              </p>
              <div className="blog-card__footer">
                <span className="blog-card__reading-time">
                  <i className="far fa-clock"></i> 12 min read
                </span>
                <a href="#" className="blog-card__read-more">
                  Read More <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="hero__wrapper">
          <h2 className="contact__title">Get In Touch</h2>
          <p className="contact__subtitle">Have a question or want to work together?</p>
          <div className="contact__content">
            <div className="contact__info">
              <div className="contact-item">
                <div className="contact-item__icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-item__details">
                  <h4 className="contact-item__title">Email</h4>
                  <p className="contact-item__text">jaime.abad.work@gmail.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item__icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact-item__details">
                  <h4 className="contact-item__title">Phone</h4>
                  <p className="contact-item__text">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item__icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-item__details">
                  <h4 className="contact-item__title">Location</h4>
                  <p className="contact-item__text">Madrid, Spain</p>
                </div>
              </div>
              <div className="contact__social">
                <h4 className="contact__social-title">Connect With Me</h4>
                <div className="social-icons">
                  <a href="https://www.linkedin.com/in/jaime-abad" target="_blank" rel="noopener noreferrer" className="social-icons__link">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://github.com/abadAfonsoJaime" target="_blank" rel="noopener noreferrer" className="social-icons__link">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="mailto:jaime.abad.work@gmail.com" className="social-icons__link">
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form__group">
                <label htmlFor="name" className="contact-form__label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="contact-form__input"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="contact-form__group">
                <label htmlFor="email" className="contact-form__label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="contact-form__input"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div className="contact-form__group">
                <label htmlFor="message" className="contact-form__label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="contact-form__textarea"
                  placeholder="Your message..."
                  rows={5}
                  required
                ></textarea>
              </div>
              <button type="submit" className="contact-form__submit">
                Send Message <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="hero__wrapper">
          <p className="footer__text">
            © 2026 Jaime Abad. Built with Next.js and ❤️
          </p>
        </div>
      </footer>
    </div>
  )
}
