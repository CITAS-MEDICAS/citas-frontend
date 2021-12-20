import dashboard from './dashboard'
import users from './users'
import administration from './administration'
import config from './config'
import insuredUsers from './insuredUsers'

export default [...dashboard, ...administration, ...users, ...insuredUsers, ...config]
