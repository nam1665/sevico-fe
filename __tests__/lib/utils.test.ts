import {
  formatDate,
  truncate,
  capitalize,
  formatCurrency,
} from '@/lib/utils'
import { isValidEmail, validatePassword } from '@/lib/validation'

describe('Utility Functions', () => {
  describe('formatDate', () => {
    it('formats a date object', () => {
      const date = new Date('2024-01-15')
      const formatted = formatDate(date)
      expect(formatted).toContain('January')
      expect(formatted).toContain('15')
      expect(formatted).toContain('2024')
    })

    it('formats a date string', () => {
      const formatted = formatDate('2024-01-15')
      expect(formatted).toContain('January')
    })
  })

  describe('truncate', () => {
    it('truncates long text', () => {
      const text = 'This is a very long text that needs to be truncated'
      const result = truncate(text, 20)
      expect(result).toHaveLength(23) // 20 + '...'
      expect(result).toContain('...')
    })

    it('does not truncate short text', () => {
      const text = 'Short'
      const result = truncate(text, 20)
      expect(result).toBe(text)
    })
  })

  describe('capitalize', () => {
    it('capitalizes first letter', () => {
      expect(capitalize('hello')).toBe('Hello')
    })

    it('handles already capitalized text', () => {
      expect(capitalize('Hello')).toBe('Hello')
    })

    it('handles empty string', () => {
      expect(capitalize('')).toBe('')
    })
  })

  describe('formatCurrency', () => {
    it('formats USD currency', () => {
      const result = formatCurrency(1234.56)
      expect(result).toContain('1,234.56')
      expect(result).toContain('$')
    })

    it('formats zero', () => {
      const result = formatCurrency(0)
      expect(result).toContain('0.00')
    })
  })
})

describe('Validation Functions', () => {
  describe('isValidEmail', () => {
    it('validates correct email', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
    })

    it('rejects invalid email', () => {
      expect(isValidEmail('invalid')).toBe(false)
      expect(isValidEmail('test@')).toBe(false)
      expect(isValidEmail('@example.com')).toBe(false)
    })
  })

  describe('validatePassword', () => {
    it('validates strong password', () => {
      const result = validatePassword('StrongPass123')
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('rejects weak password', () => {
      const result = validatePassword('weak')
      expect(result.isValid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })

    it('requires uppercase letter', () => {
      const result = validatePassword('password123')
      expect(result.isValid).toBe(false)
      expect(result.errors.some((e) => e.includes('uppercase'))).toBe(true)
    })

    it('requires number', () => {
      const result = validatePassword('Password')
      expect(result.isValid).toBe(false)
      expect(result.errors.some((e) => e.includes('number'))).toBe(true)
    })
  })
})
