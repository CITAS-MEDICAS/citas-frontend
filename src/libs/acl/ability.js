import { Ability } from '@casl/ability'
import { initialAbility } from './config'
import { useJwt } from '@/auth/jwt/useJwt'

//  Read ability from localStorage
// * Handles auto fetching previous abilities if already logged in user
// ? You can update this if you store user abilities to more secure place
// ! Anyone can update localStorage so be careful and please update this
// const userData = JSON.parse(localStorage.getItem('userData'))
// const existingAbility = userData ? userData.ability : null

const activeRole = useJwt.getActiveRole()
const permissions = activeRole ? activeRole.permissions : null
const abilities = permissions ? [...initialAbility, ...permissions] : initialAbility

export default new Ability(abilities)
