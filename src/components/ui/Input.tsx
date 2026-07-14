import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, id, className = '', ...rest },
  ref,
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={`w-full rounded-lg border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-brand-muted/60 outline-none transition-colors focus:border-brand-teal focus:bg-white/10 ${
          error ? 'border-brand-danger' : 'border-white/15'
        } ${className}`}
        {...rest}
      />
      {error && <span className="text-xs text-brand-danger">{error}</span>}
    </div>
  )
})

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, id, className = '', ...rest },
  ref,
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        className={`w-full resize-none rounded-lg border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-brand-muted/60 outline-none transition-colors focus:border-brand-teal focus:bg-white/10 ${
          error ? 'border-brand-danger' : 'border-white/15'
        } ${className}`}
        {...rest}
      />
      {error && <span className="text-xs text-brand-danger">{error}</span>}
    </div>
  )
})
