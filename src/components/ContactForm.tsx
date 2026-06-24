import { useEffect, useRef, useState } from 'react'
import { Send, AlertCircle, CheckCircle2 } from 'lucide-react'

const SUBMIT_COOLDOWN_MS = 30_000
const MAX_NAME = 80
const MAX_SUBJECT = 120
const MAX_MESSAGE = 2000

function sanitize(input: string): string {
  return input
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .replace(/[\r\n]+/g, '\n')
    .trim()
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254
}

interface Errors {
  name?: string
  email?: string
  message?: string
  cooldown?: string
}

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const mountTime = useRef(Date.now())

  useEffect(() => {
    if (!sent) return
    const id = setTimeout(() => setSent(false), 6000)
    return () => clearTimeout(id)
  }, [sent])

  function getLastSubmit(): number {
    try {
      const v = window.localStorage.getItem('contact:lastSubmit')
      return v ? parseInt(v, 10) || 0 : 0
    } catch {
      return 0
    }
  }

  function setLastSubmit(t: number) {
    try { window.localStorage.setItem('contact:lastSubmit', String(t)) } catch { /* ignore */ }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (website.trim() !== '') {
      setSent(true)
      return
    }

    if (Date.now() - mountTime.current < 1500) {
      setErrors({ cooldown: 'Demasiado rápido — preenche o formulário com calma.' })
      return
    }

    const since = Date.now() - getLastSubmit()
    if (since < SUBMIT_COOLDOWN_MS) {
      const wait = Math.ceil((SUBMIT_COOLDOWN_MS - since) / 1000)
      setErrors({ cooldown: `Aguarda ${wait}s antes de enviar novo pedido.` })
      return
    }

    const cleanName = sanitize(name).slice(0, MAX_NAME)
    const cleanEmail = sanitize(email).slice(0, 254).toLowerCase()
    const cleanSubject = sanitize(subject).slice(0, MAX_SUBJECT)
    const cleanMessage = sanitize(message).slice(0, MAX_MESSAGE)

    const newErrors: Errors = {}
    if (cleanName.length < 2) newErrors.name = 'Nome demasiado curto'
    if (!isValidEmail(cleanEmail)) newErrors.email = 'Email inválido'
    if (cleanMessage.length < 10) newErrors.message = 'Mensagem demasiado curta (mín. 10 caracteres)'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const mailto =
      'mailto:mendesisidro964@gmail.com' +
      '?subject=' + encodeURIComponent(cleanSubject || `Contacto via Portfolio — ${cleanName}`) +
      '&body=' + encodeURIComponent(
        `Nome: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}\n\n--\nEnviado via portfolio`,
      )

    setLastSubmit(Date.now())
    setErrors({})
    setSent(true)
    setName(''); setEmail(''); setSubject(''); setMessage('')

    window.location.href = mailto
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card border-slate-800/60 p-6 sm:p-8 flex flex-col gap-4"
      noValidate
    >
      <div>
        <h3 className="text-white font-bold text-lg mb-1">Enviar mensagem rápida</h3>
        <p className="text-slate-500 text-xs">Abre o teu cliente de email com a mensagem pronta — sem servidor, sem tracking.</p>
      </div>

      {/* honeypot */}
      <div className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
        <label>
          Não preencher
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={e => setWebsite(e.target.value)}
            name="website"
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Nome" id="cf-name" error={errors.name}>
          <input
            id="cf-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={e => setName(e.target.value.slice(0, MAX_NAME))}
            maxLength={MAX_NAME}
            required
            className="form-input"
          />
        </Field>
        <Field label="Email" id="cf-email" error={errors.email}>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value.slice(0, 254))}
            maxLength={254}
            required
            className="form-input"
          />
        </Field>
      </div>

      <Field label="Assunto (opcional)" id="cf-subject">
        <input
          id="cf-subject"
          type="text"
          value={subject}
          onChange={e => setSubject(e.target.value.slice(0, MAX_SUBJECT))}
          maxLength={MAX_SUBJECT}
          className="form-input"
        />
      </Field>

      <Field label="Mensagem" id="cf-message" error={errors.message}>
        <textarea
          id="cf-message"
          value={message}
          onChange={e => setMessage(e.target.value.slice(0, MAX_MESSAGE))}
          maxLength={MAX_MESSAGE}
          rows={4}
          required
          className="form-input resize-y min-h-24"
        />
        <p className="text-[10px] text-slate-600 mt-1 text-right">
          {message.length}/{MAX_MESSAGE}
        </p>
      </Field>

      {errors.cooldown && (
        <p className="text-amber-400 text-xs flex items-center gap-1.5">
          <AlertCircle size={12} /> {errors.cooldown}
        </p>
      )}
      {sent && (
        <p className="text-brand-400 text-xs flex items-center gap-1.5" role="status">
          <CheckCircle2 size={12} /> Pronto! O teu cliente de email foi aberto.
        </p>
      )}

      <button
        type="submit"
        className="btn-primary self-start"
      >
        <Send size={15} />
        Preparar email
      </button>

      <style>{`
        .form-input {
          width: 100%;
          padding: 0.625rem 0.75rem;
          background: rgb(15 23 42 / 0.7);
          border: 1px solid rgb(30 41 59 / 0.8);
          border-radius: 0.625rem;
          color: rgb(226 232 240);
          font-size: 0.875rem;
          transition: all 0.15s ease;
        }
        .form-input:focus {
          outline: none;
          border-color: rgb(34 197 94 / 0.5);
          box-shadow: 0 0 0 3px rgb(34 197 94 / 0.15);
        }
      `}</style>
    </form>
  )
}

interface FieldProps {
  label: string
  id: string
  error?: string
  children: React.ReactNode
}

function Field({ label, id, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs text-slate-400 mb-1.5 font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
          <AlertCircle size={10} /> {error}
        </p>
      )}
    </div>
  )
}
