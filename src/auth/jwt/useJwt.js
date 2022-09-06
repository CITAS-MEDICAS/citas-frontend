import axios from '@/libs/axios'
import JwtService from '@/@core/auth/jwt/jwtService'

const useJwt = new JwtService(axios, {})

export { useJwt }
