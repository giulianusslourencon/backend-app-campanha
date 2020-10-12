import * as jwt from 'jsonwebtoken'
import * as forge from 'node-forge'
import { RequestHandler, Request } from 'express'

export enum PERMISSION {
  NON_MEMBER,
  MEMBER,
  COORD,
  MASTER
}

type UserToken = {
  _id: string,
  role: PERMISSION
}

export interface AuthRequest extends Request {
  user?: UserToken
}

const generateKeyPairRSA = () => {
  const keys = forge.pki.rsa.generateKeyPair({ bits: 4096, workers: 1 });
  return {
    publicKey: forge.pki.publicKeyToPem(keys.publicKey),
    privateKey: forge.pki.privateKeyToPem(keys.privateKey)
  }
}

const keys = generateKeyPairRSA()

export const generateJWTToken = (payload: UserToken, time = '7d') => {
  const token = jwt.sign(payload, keys.privateKey, {
    algorithm: 'RS256',
    expiresIn: time
  })
  return token
}

const decoder = (userRole: PERMISSION, routePermission: PERMISSION) => {
  return userRole >= routePermission
}

export const decodeUser: RequestHandler = (req: AuthRequest, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error('Unauthorized');

    const token = req.headers.authorization.replace('Bearer ', '')
    const user = jwt.verify(token, keys.publicKey) as UserToken
    req.user = user
    next()
  } catch (error) {
    return res.status(412).send(error.message)
  }
}

export const verifyRoutePermission = (routePermission: PERMISSION) => {
  const verifyMiddleware: RequestHandler = (req: AuthRequest, res, next) => {
    try {
      if (!decoder(req.user!.role, routePermission))
        throw new Error('Unauthorized')
      next()
    } catch (error) {
      return res.status(403).send(error.message)
    }
  }
  return verifyMiddleware
}

export const verifySelfRoute: RequestHandler = (req: AuthRequest, res, next) => {
  try {
    if (
      req.user!.role !== PERMISSION.MASTER &&
      req.user!._id !== req.params.id
    ) throw new Error('Unauthorized')

    next()
  } catch (error) {
    return res.status(403).send(error.message)
  }
}
