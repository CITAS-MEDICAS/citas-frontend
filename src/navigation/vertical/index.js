import dashboard from './dashboard'
import users from './users'
import administration from './administration'
import config from './config'
import insuredUsers from './insuredUsers'
import appointment from './appointments'

export default [
  ...dashboard,
  ...administration,
  ...appointment,
  ...users,
  ...insuredUsers,
  ...config
]
