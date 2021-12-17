import useJwt from '@/@core/auth/jwt/useJwtService'
import axios from '@axios'

const { jwt } = useJwt(axios, {})
export default jwt
