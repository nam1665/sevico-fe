import { render, screen } from '@testing-library/react'
import { FormInput } from '@/components/FormInput'

describe('FormInput Component', () => {
  it('renders input with label', () => {
    render(<FormInput label="Email" />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('displays error message when provided', () => {
    render(<FormInput label="Email" error="Invalid email" />)
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
  })

  it('applies error styles when error is present', () => {
    render(<FormInput label="Email" error="Error" />)
    const input = screen.getByLabelText(/email/i)
    expect(input).toHaveClass('border-red-500')
  })

  it('sets aria-invalid when error is present', () => {
    render(<FormInput label="Email" error="Error" />)
    const input = screen.getByLabelText(/email/i)
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('generates id from label', () => {
    render(<FormInput label="Email Address" />)
    const input = screen.getByLabelText(/email address/i)
    expect(input).toHaveAttribute('id', 'email-address')
  })

  it('uses custom id when provided', () => {
    render(<FormInput label="Email" id="custom-id" />)
    const input = screen.getByLabelText(/email/i)
    expect(input).toHaveAttribute('id', 'custom-id')
  })
})
