import dashboard from './dashboard'
import users from './users'
import administration from './administration'
import config from './config'
import insured from './insured'

export default [
  ...dashboard,
  ...administration,
  ...users,
  ...insured,
  ...config,
]
