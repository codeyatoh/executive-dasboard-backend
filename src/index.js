import { app } from './app.js'
import { logger } from './logger.js'
import { ExternalOrdersService } from './external-orders/external-orders.class.js'

const port = app.get('port')
const host = app.get('host')

process.on('unhandledRejection', reason => logger.error('Unhandled Rejection %O', reason))

app.listen(port).then(() => {
  logger.info(`Feathers app listening on http://${host}:${port}`)
})

export const services = app => {
  app.use('/external-orders', new ExternalOrdersService({ app }))
}
