import jwt from 'jsonwebtoken'

const jwtsecretkey=process.env.JWT_SECRET

export const generatetoken=(userid)=>{
  const token=jwt.sign({userid},jwtsecretkey)
  return token
}