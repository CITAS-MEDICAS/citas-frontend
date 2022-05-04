<template>
  <div>
    <v-select
      :value="value"
      :options="options"
      :clearable="false"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="[sizeClass]"
      :selectable="handleSelectable"
      @input="handleInput"
    />
  </div>
</template>

<script>
import { useTimeSelect } from './useTimeSelect'

export default {
  name: 'TimeSelect',
  props: {
    value: {
      type: String,
      required: false,
      default: null
    },
    pickerOptions: {
      type: Object,
      default() {
        return {
          start: '06:00',
          end: '18:00',
          step: '00:30',
          minTime: null
        }
      }
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      options: []
    }
  },
  computed: {
    sizeClass() {
      if (this.size === 'sm') return 'select-size-sm'
      return ''
    }
  },
  setup() {
    const { generateTimeInterval, timeToInt } = useTimeSelect()
    return {
      generateTimeInterval,
      timeToInt
    }
  },
  watch: {
    'pickerOptions.step': {
      handler(newStep, oldStep) {
        clearTimeout(this.timer)
        const stepIsValid = step => step.split(':')[1] > 0
        if (stepIsValid(newStep)) {
          this.timer = setTimeout(() => {
            this.options = this.generateTimeInterval(this.pickerOptions)
            this.$emit('input', null)
          }, 500)
        }
      }
    },
    'pickerOptions.minTime': {
      handler(minTime) {
        if(!minTime || !this.value) return

        if(this.timeToInt(this.value) < this.timeToInt(minTime)) {
          this.$emit('input', null)
        }
      }
    }
  },
  methods: {
    stepIsValid(step) {
      return step.split(':')[1] > 0
    },
    handleInput(value){
      this.$emit('input', value)
      this.$emit('change', value)
    },
    handleSelectable(value) {
      const minTime = this.pickerOptions.minTime
      if(!minTime) return true
      return this.timeToInt(value) > this.timeToInt(minTime)
    }
  },
}
</script>

