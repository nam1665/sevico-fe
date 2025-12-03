import { InputHTMLAttributes } from 'react'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function FormInput({ label, error, id, ...props }: FormInputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={inputId}
        className={`input-field mt-1 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600" id={`${inputId}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
