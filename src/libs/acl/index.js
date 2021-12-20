import Vue from 'vue'
import { abilitiesPlugin } from '@casl/vue'
import ability from './ability'

console.log('-> ability', ability)

Vue.use(abilitiesPlugin, ability)
