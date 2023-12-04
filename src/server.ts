import { app } from './app'
import { env } from './env'

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.info(`HTTP server listening on port ${env.PORT}`)
  })
