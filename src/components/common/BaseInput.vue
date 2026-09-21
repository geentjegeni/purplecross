<script setup>
import { useId } from 'vue'

defineProps({
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  ariaLabel: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default: null,
  },
})

const model = defineModel({ type: [String, Number], default: '' })
const emit = defineEmits(['blur'])

const inputId = `input-${useId()}`
const errorId = `${inputId}-error`
const datalistId = `${inputId}-options`
</script>

<template>
  <div class="form-field" :class="{ 'has-error': error }">
    <label v-if="label" :for="inputId" class="form-label">
      {{ label }}
      <span v-if="required" class="form-required" aria-hidden="true">*</span>
    </label>

    <input
      :id="inputId"
      v-model="model"
      class="form-input"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :aria-label="ariaLabel || label || undefined"
      :aria-invalid="!!error"
      :aria-describedby="error ? errorId : undefined"
      :list="options ? datalistId : undefined"
      @blur="emit('blur')"
    />

    <datalist v-if="options" :id="datalistId">
      <option v-for="option in options" :key="option" :value="option" />
    </datalist>

    <p v-if="error" :id="errorId" class="form-error" role="alert">{{ error }}</p>
  </div>
</template>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  color: #374151;
  font-size: 0.85rem;
  font-weight: 600;
}

.form-required {
  color: #dc2626;
}

.form-input {
  width: 100%;
  padding: 9px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  color: #1f2937;
  font-size: 0.875rem;
}

.form-input:focus {
  border-color: #7c3aed;
  outline: 2px solid #7c3aed33;
}

.has-error .form-input {
  border-color: #dc2626;
}

.form-error {
  margin: 0;
  color: #dc2626;
  font-size: 0.78rem;
}
</style>
