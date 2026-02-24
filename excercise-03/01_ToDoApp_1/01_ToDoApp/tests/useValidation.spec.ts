import { describe, it, expect } from 'vitest'
import { useValidation, rules } from '@/composables/useValidation'

describe('useValidation', () => {
  describe('rules.required', () => {
    it('passes for non-empty string', () => {
      const rule = rules.required()
      expect(rule('test')).toBe(true)
    })

    it('fails for empty string', () => {
      const rule = rules.required()
      expect(rule('')).toBe('This field is required')
    })

    it('fails for whitespace only', () => {
      const rule = rules.required()
      expect(rule('   ')).toBe('This field is required')
    })

    it('uses custom message', () => {
      const rule = rules.required('Custom message')
      expect(rule('')).toBe('Custom message')
    })
  })

  describe('rules.minLength', () => {
    it('passes for string meeting minimum', () => {
      const rule = rules.minLength(3)
      expect(rule('abc')).toBe(true)
    })

    it('fails for string below minimum', () => {
      const rule = rules.minLength(3)
      expect(rule('ab')).toBe('At least 3 characters required')
    })

    it('uses custom message', () => {
      const rule = rules.minLength(3, 'Too short')
      expect(rule('ab')).toBe('Too short')
    })
  })

  describe('rules.maxLength', () => {
    it('passes for string within maximum', () => {
      const rule = rules.maxLength(5)
      expect(rule('test')).toBe(true)
    })

    it('fails for string exceeding maximum', () => {
      const rule = rules.maxLength(5)
      expect(rule('testing')).toBe('Maximum 5 characters allowed')
    })
  })

  describe('useValidation composable', () => {
    it('initializes with correct values', () => {
      const { value, error, touched, isValid } = useValidation('initial')

      expect(value.value).toBe('initial')
      expect(error.value).toBe('')
      expect(touched.value).toBe(false)
      expect(isValid.value).toBe(true)
    })

    it('validates on demand', () => {
      const { value, validate, error } = useValidation('', [rules.required()])

      const isValid = validate()

      expect(isValid).toBe(false)
      expect(error.value).toBe('This field is required')
    })

    it('clears error when valid', () => {
      const { value, validate, error } = useValidation<string>('', [rules.required()])

      validate() // First validation fails
      value.value = 'valid'
      validate() // Second validation passes

      expect(error.value).toBe('')
    })

    it('resets validation state', () => {
      const { validate, reset, touched, error } = useValidation('', [rules.required()])

      validate()
      expect(touched.value).toBe(true)

      reset()
      expect(touched.value).toBe(false)
      expect(error.value).toBe('')
    })

    it('validates multiple rules in order', () => {
      const { validate, error } = useValidation('', [
        rules.required('Required'),
        rules.minLength(3, 'Min 3'),
      ])

      validate()
      expect(error.value).toBe('Required') // First rule fails

      const { value: v2, validate: val2, error: e2 } = useValidation('ab', [
        rules.required('Required'),
        rules.minLength(3, 'Min 3'),
      ])

      val2()
      expect(e2.value).toBe('Min 3') // Second rule fails
    })
  })
})
