import { ref, computed } from 'vue'

type ValidationRule<T> = (value: T) => true | string

/** Predefined validation rules (factory functions) */
export const rules = {
  required: (message = 'This field is required'): ValidationRule<string> => {
    return (value: string) => value.trim().length > 0 || message
  },

  minLength: (min: number, message?: string): ValidationRule<string> => {
    return (value: string) => {
      const defaultMessage = `At least ${min} characters required`
      return value.trim().length >= min || message || defaultMessage
    }
  },

  maxLength: (max: number, message?: string): ValidationRule<string> => {
    return (value: string) => {
      const defaultMessage = `Maximum ${max} characters allowed`
      return value.trim().length <= max || message || defaultMessage
    }
  },
}

/** Composable for field validation with reactive error states */
export function useValidation<T>(
  initialValue: T,
  validationRules: ValidationRule<T>[] = []
) {
  const value = ref<T>(initialValue)
  const error = ref<string>('')
  const touched = ref(false)

  const validate = (): boolean => {
    touched.value = true
    for (const rule of validationRules) {
      const result = rule(value.value as T)
      if (result !== true) {
        error.value = result
        return false
      }
    }
    error.value = ''
    return true
  }

  const reset = (): void => {
    error.value = ''
    touched.value = false
  }

  const isValid = computed(() => {
    if (!touched.value) return true
    return validationRules.every((rule) => rule(value.value as T) === true)
  })

  return { value, error, touched, isValid, validate, reset }
}
