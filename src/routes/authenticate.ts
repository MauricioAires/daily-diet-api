import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database/connection'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { env } from '../env'

export async function AuthenticateRoutes(app: FastifyInstance) {
  app.post('/login', async (req, reply) => {
    const loginSchema = z.object({
      email: z.string().email(),
      password: z.string(),
    })

    const { email, password } = loginSchema.parse(req.body)

    const user = await knex('users')
      .where({
        email,
      })
      .first()

    if (!user) {
      return reply.status(401).send({
        error: 'E-mail or password is incorrect',
      })
    }

    const passwordMatch = await compare(password, user?.password)

    if (!passwordMatch) {
      return reply.status(401).send({
        error: 'E-mail or password is incorrect',
      })
    }

    const token = sign(
      {
        email: user.email,
      },
      env.SECRET_TOKEN,
      {
        subject: user.id,
        expiresIn: env.EXPIRES_TOKEN,
      },
    )

    return {
      token,
      user: {
        email: user.email,
        name: user.name,
      },
    }
  })
}
