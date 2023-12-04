import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { hash } from 'bcrypt'
import { knex } from '../database/connection'
import { env } from '../env'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (req, res) => {
    const createUserSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    })

    const { email, name, password } = createUserSchema.parse(req.body)

    const passwordHash = await hash(password, env.BYCRYPT_HASH_SALT)

    await knex('users').insert({
      id: randomUUID(),
      name,
      email,
      password: passwordHash,
    })

    return res.status(204).send()
  })
}
