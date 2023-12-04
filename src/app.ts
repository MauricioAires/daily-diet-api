import fastify from 'fastify'
import { usersRoutes } from './routes/users'
import { AuthenticateRoutes } from './routes/authenticate'
import { mealsRoutes } from './routes/meals'

const app = fastify()

app.register(AuthenticateRoutes)
app.register(usersRoutes, {
  prefix: '/users',
})
app.register(mealsRoutes, {
  prefix: '/meals',
})

export { app }
