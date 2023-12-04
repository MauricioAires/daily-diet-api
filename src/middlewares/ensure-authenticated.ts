import { FastifyReply, FastifyRequest } from 'fastify'
import { verify } from 'jsonwebtoken'
import { z } from 'zod'
import { env } from '../env'
import { knex } from '../database/connection'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const headerSchema = z.object({
    authorization: z.string(),
  })

  const checkHasAuthorization = headerSchema.safeParse(req.headers)

  if (checkHasAuthorization.success === false) {
    return reply.status(401).send({
      error: 'Authorization token is required',
    })
  }

  const { authorization } = checkHasAuthorization.data

  const [, token] = authorization.split(' ')

  try {
    const { sub: id } = verify(token, env.SECRET_TOKEN) as IPayload

    const user = await knex('users').where({ id }).first()

    if (!user) {
      return reply.status(401).send({
        error: 'User not found',
      })
    }

    req.user = {
      id,
    }
  } catch (error) {
    return reply.status(401).send({
      error: 'Token is invalid',
    })
  }
}
