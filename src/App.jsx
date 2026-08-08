import { useEffect, useState } from 'react'
import './App.css'

const experience = [
  { level: '03', role: 'Senior Software Developer', period: 'Apr 2026 - Present', summary: 'Leading scalable Laravel delivery, AWS infrastructure, code quality and developer mentoring.', highlights: ['30% faster deployments', 'AWS ownership', 'Mentoring 2 developers'] },
  { level: '02', role: 'Software Developer', period: 'Apr 2025 - Mar 2026', summary: 'Built and supported production applications across PHP, Laravel, Node.js and AWS.', highlights: ['Production support', 'CI/CD automation', 'Technical specifications'] },
  { level: '01', role: 'Junior Software Developer', period: 'Jan 2023 - Mar 2025', summary: 'Developed, tested and maintained web applications across the full delivery lifecycle.', highlights: ['Laravel delivery', 'Testing and debugging', 'Project documentation'] },
]

const capabilities = [
  { code: 'BE', title: 'Backend systems', tools: 'PHP / Laravel / Node.js / REST APIs', note: 'Maintainable application architecture and dependable business logic.' },
  { code: 'CL', title: 'Cloud delivery', tools: 'AWS / EC2 / RDS / S3 / IAM', note: 'Infrastructure, deployments and production reliability.' },
  { code: 'DV', title: 'DevOps workflow', tools: 'GitLab CI/CD / Git / Linux', note: 'Faster, repeatable and safer software releases.' },
  { code: 'DT', title: 'Data and frontend', tools: 'MySQL / SQL / JavaScript / React', note: 'Practical interfaces backed by well-structured data.' },
]

const cases = [
  { id: 'A', title: 'Deployment velocity', metric: '30%', label: 'faster', text: 'Optimized GitLab CI/CD pipelines to accelerate releases by 30% while reducing manual deployment effort.', stack: ['GitLab', 'AWS', 'Automation'] },
  { id: 'B', title: 'Production platforms', metric: '3+', label: 'years', text: 'Delivered and supported Laravel applications with MySQL data layers and AWS infrastructure.', stack: ['Laravel', 'MySQL', 'AWS'] },
  { id: 'C', title: 'Team enablement', metric: '02', label: 'mentees', text: 'Improved engineering consistency through reviews, standards, testing guidance and documentation.', stack: ['Reviews', 'Testing', 'Leadership'] },
]

const Icon = ({ direction = 'right' }) => <svg viewBox="0 0 20 20" aria-hidden="true"><path d={direction === 'up' ? 'M5 15 15 5m-7 0h7v7' : 'M3 10h14m-5-5 5 5-5 5'} /></svg>

function App() {
  const [menu, setMenu] = useState(false)
  const [resume, setResume] = useState(false)
  const [active, setActive] = useState('profile')

  useEffect(() => {
    const nodes = [...document.querySelectorAll('[data-reveal]')]
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('shown')
    }), { threshold: .12 })
    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const ids = ['profile', 'experience', 'capabilities', 'work', 'contact']
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: '-25% 0px -60%' })
    ids.forEach(id => { const node = document.getElementById(id); if (node) observer.observe(node) })
    return () => observer.disconnect()
  }, [])

  useEffect(() => { document.body.classList.toggle('modal-open', resume); return () => document.body.classList.remove('modal-open') }, [resume])

  const go = (event, id) => {
    event.preventDefault()
    setMenu(false)
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  return <div className="dossier">
    <aside className="rail">
      <a href="#profile" className="rail-logo" onClick={e => go(e, 'profile')}>YM</a>
      <nav className={menu ? 'rail-nav open' : 'rail-nav'}>{[['profile', 'Profile'], ['experience', 'Career'], ['capabilities', 'Stack'], ['work', 'Impact'], ['contact', 'Contact']].map(([id, label], i) => <a className={active === id ? 'active' : ''} href={`#${id}`} onClick={e => go(e, id)} key={id}><span>0{i + 1}</span>{label}</a>)}</nav>
      <button className="rail-resume" onClick={() => setResume(true)}>CV <Icon /></button>
      <button className="menu-toggle" onClick={() => setMenu(!menu)} aria-label="Toggle menu"><i /><i /></button>
    </aside>

    <main>
      <section className="profile" id="profile">
        <div className="profile-no">01 / PROFILE</div>
        <div className="profile-layout">
          <div className="profile-copy" data-reveal>
            <p className="status"><i /> Open to building reliable, scalable software.</p>
            <h1>Yogesh<br /><span>Mandavkar.</span></h1>
            <p className="role-line">Senior software developer building reliable web systems and the infrastructure that keeps them moving.</p>
            <div className="profile-actions"><a href="mailto:yogeshmandavkar123456@gmail.com">Start a conversation <Icon /></a><button onClick={() => setResume(true)}>View resume</button></div>
          </div>
          <div className="identity-card" data-reveal>
            <img src="/yogesh-portrait.jpg" alt="Yogesh Mandavkar in a mountain valley" />
            <div className="identity-data"><span>Mumbai, India</span><strong>PHP / Laravel / AWS</strong></div>
          </div>
        </div>
        <div className="signal-bar"><span>03+ years experience</span><span>30% faster deployments</span><span>02 developers mentored</span></div>
      </section>

      <section className="career section-block" id="experience">
        <SectionTitle number="02" label="Career ledger" title="Growth through ownership." copy="One company, three engineering levels, and progressively wider responsibility across code, cloud and people." />
        <div className="company-line"><div><span>Current company</span><strong>Indigital Technologies LLP</strong></div><p>Jan 2023 - Present / Mumbai</p></div>
        <div className="career-list">{experience.map(item => <article key={item.level} data-reveal><div className="level">{item.level}</div><div><p className="period">{item.period}</p><h3>{item.role}</h3><p>{item.summary}</p></div><ul>{item.highlights.map(x => <li key={x}>{x}</li>)}</ul></article>)}</div>
      </section>

      <section className="capabilities section-block" id="capabilities">
        <SectionTitle number="03" label="Capability index" title="Tools with a purpose." copy="A practical stack built around shipping maintainable products, not collecting buzzwords." />
        <div className="capability-grid">{capabilities.map(item => <article key={item.code} data-reveal><span>{item.code}</span><h3>{item.title}</h3><strong>{item.tools}</strong><p>{item.note}</p></article>)}</div>
      </section>

      <section className="impact section-block" id="work">
        <SectionTitle number="04" label="Selected impact" title="Evidence, not decoration." copy="Representative outcomes drawn from production delivery, infrastructure work and team contribution." />
        <div className="case-grid">{cases.map(item => <article key={item.id} data-reveal><div className="case-top"><span>{item.id}</span><Icon direction="up" /></div><div className="metric"><strong>{item.metric}</strong><span>{item.label}</span></div><h3>{item.title}</h3><p>{item.text}</p><div className="chips">{item.stack.map(x => <span key={x}>{x}</span>)}</div></article>)}</div>
      </section>

      <section className="education-strip"><div><span>Education</span><strong>Masters in Computer Application</strong><small>L. B. Hiray S.S. Trusts Institute / 2021 - 2023</small></div><b>8.81</b></section>

      <section className="contact-panel" id="contact" data-reveal>
        <div><span>05 / CONTACT</span><h2>Ready to build<br />something dependable?</h2></div>
        <div className="contact-copy"><p>Open to software development roles and conversations about ambitious web products.</p><a href="mailto:yogeshmandavkar123456@gmail.com">yogeshmandavkar123456@gmail.com <Icon /></a><div><a href="https://www.linkedin.com/in/yogesh-mandavkar-252397255" target="_blank" rel="noreferrer">LinkedIn</a><a href="tel:+918291403136">+91 82914 03136</a></div></div>
      </section>

      <footer><span>Yogesh Mandavkar / {new Date().getFullYear()}</span><a href="#profile" onClick={e => go(e, 'profile')}>Back to top <Icon direction="up" /></a></footer>
    </main>

    {resume && <div className="resume-modal" role="dialog" aria-modal="true" onMouseDown={e => e.target === e.currentTarget && setResume(false)}><div className="resume-window"><header><div><span>RESUME.PDF</span><strong>Yogesh Mandavkar</strong></div><nav><a href="/Yogesh_Mandavkar_Resume.pdf" download>Download</a><a href="/Yogesh_Mandavkar_Resume.pdf" target="_blank" rel="noreferrer">Open</a><button onClick={() => setResume(false)}>Close</button></nav></header><iframe src="/Yogesh_Mandavkar_Resume.pdf" title="Yogesh Mandavkar resume" /></div></div>}
  </div>
}

function SectionTitle({ number, label, title, copy }) { return <header className="section-title" data-reveal><div><span>{number} / {label}</span><h2>{title}</h2></div><p>{copy}</p></header> }

export default App
