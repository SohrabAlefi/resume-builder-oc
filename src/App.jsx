import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './components/Button'
import Input from './components/Input'
import Textarea from './components/Textarea'

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

export default function App() {
  const [form, setForm] = useState({ name: '', title: '', email: '', phone: '', summary: '', skills: '', experience: '', education: '' })
  const [saved, setSaved] = useState(false)

  const update = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const save = () => {
    localStorage.setItem('resume-draft', JSON.stringify(form))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const load = () => {
    const d = localStorage.getItem('resume-draft')
    if (d) setForm(JSON.parse(d))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50 p-6">
      <div className="max-w-3xl mx-auto">

        {/* Hero */}
        <motion.div initial="hidden" animate="show" variants={stagger} className="mb-8 text-center">
          <motion.h1 variants={fadeUp} className="text-4xl font-extrabold text-sky-700">Resume Builder</motion.h1>
          <motion.p variants={fadeUp} className="text-gray-500 mt-2">Fill in your details and export a polished PDF resume.</motion.p>
        </motion.div>

        {/* Form card */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6 space-y-6">

          <Section title="Personal Info">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input data-testid="input-name" placeholder="Full Name" value={form.name} onChange={update('name')} />
              <Input data-testid="input-title" placeholder="Job Title" value={form.title} onChange={update('title')} />
              <Input data-testid="input-email" placeholder="Email" type="email" value={form.email} onChange={update('email')} />
              <Input placeholder="Phone" type="tel" value={form.phone} onChange={update('phone')} />
            </div>
          </Section>

          <Section title="Summary">
            <Textarea placeholder="Professional summary..." rows={3} value={form.summary} onChange={update('summary')} />
          </Section>

          <Section title="Skills">
            <Input placeholder="e.g. JavaScript, React, Node.js" value={form.skills} onChange={update('skills')} />
          </Section>

          <Section title="Experience">
            <Textarea placeholder="Company, role, dates, responsibilities..." rows={4} value={form.experience} onChange={update('experience')} />
          </Section>

          <Section title="Education">
            <Textarea placeholder="Institution, degree, year..." rows={3} value={form.education} onChange={update('education')} />
          </Section>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button data-testid="btn-print" onClick={() => window.print()}>Print / Export PDF</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={save}>Save Draft</Button>
            <Button className="bg-gray-200 text-gray-700 hover:bg-gray-300" onClick={load}>Load Draft</Button>
            <Button className="bg-gray-200 text-gray-700 hover:bg-gray-300" onClick={() => setForm({ name:'',title:'',email:'',phone:'',summary:'',skills:'',experience:'',education:'' })}>Clear</Button>
          </div>

          <AnimatePresence>
            {saved && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-emerald-600 text-sm">
                ✔ Draft saved to browser storage.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Print preview */}
        <div id="resume-preview" className="hidden print:block mt-8 bg-white p-8 text-sm">
          <h1 className="text-2xl font-bold">{form.name}</h1>
          <p className="text-gray-600">{form.title}</p>
          <p className="text-gray-500">{form.email}{form.phone && ` • ${form.phone}`}</p>
          {form.summary && <><h2 className="font-semibold mt-4">Summary</h2><p>{form.summary}</p></>}
          {form.skills && <><h2 className="font-semibold mt-4">Skills</h2><p>{form.skills}</p></>}
          {form.experience && <><h2 className="font-semibold mt-4">Experience</h2><p className="whitespace-pre-wrap">{form.experience}</p></>}
          {form.education && <><h2 className="font-semibold mt-4">Education</h2><p className="whitespace-pre-wrap">{form.education}</p></>}
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <motion.section initial="hidden" animate="show" variants={fadeUp}>
      <h2 className="text-lg font-semibold text-gray-700 mb-3">{title}</h2>
      {children}
    </motion.section>
  )
}
