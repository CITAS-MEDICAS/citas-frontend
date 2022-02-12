<template>
  <div>
    <v-select
      :value="value"
      :options="options"
      :clearable="false"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="[sizeClass]"
      @input="handleInput"
    />
  </div>
</template>

<script>
import { ref, toRefs } from '@vue/composition-api'
import { useTimeSelect } from './useTimeSelect'

export default {
  name: 'TimeSelect',
  props: {
    value: {
      type: String,
      required: false,
      default: null,
    },
    pickerOptions: {
      type: Object,
      default() {
        return {
          start: '06:00',
          end: '18:00',
          step: '00:30',
          minTime: '06:00',
        }
      },
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '',
    },
  },
  computed: {
    sizeClass() {
      if (this.size === 'sm') return 'select-size-sm'
      return ''
    },
  },
  setup(props, { emit }) {
    const { pickerOptions } = toRefs(props)
    const { generateTimeInterval } = useTimeSelect()
    const options = ref(generateTimeInterval(pickerOptions.value))

    const handleInput = value => {
      emit('input', value)
      emit('change', value)
    }

    return {
      options,
      handleInput,
    }
  },
}
</script>

<style scoped></style>
